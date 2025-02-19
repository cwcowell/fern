import { FERN_PACKAGE_MARKER_FILENAME } from "@fern-api/configuration";
import { RelativeFilePath } from "@fern-api/fs-utils";
import { isRawAliasDefinition } from "@fern-api/fern-definition-schema";
import { buildAuthSchemes } from "./buildAuthSchemes";
import { buildChannel } from "./buildChannel";
import { buildEnvironments } from "./buildEnvironments";
import { buildGlobalHeaders } from "./buildGlobalHeaders";
import { buildIdempotencyHeaders } from "./buildIdempotencyHeaders";
import { buildServices } from "./buildServices";
import { buildTypeDeclaration } from "./buildTypeDeclaration";
import { buildVariables } from "./buildVariables";
import { buildWebhooks } from "./buildWebhooks";
import { FernDefinition } from "./FernDefnitionBuilder";
import { OpenApiIrConverterContext } from "./OpenApiIrConverterContext";
import { getDeclarationFileForSchema } from "./utils/getDeclarationFileForSchema";
import { getTypeFromTypeReference } from "./utils/getTypeFromTypeReference";
import { convertSdkGroupNameToFile } from "./utils/convertSdkGroupName";
import { Schema } from "@fern-api/openapi-ir-sdk";

export const ROOT_PREFIX = "root";
export const EXTERNAL_AUDIENCE = "external";
/** All errrors are currently declared in __package__.yml */
export const ERROR_DECLARATIONS_FILENAME = RelativeFilePath.of(FERN_PACKAGE_MARKER_FILENAME);

function addSchemas({
    schemas,
    schemaIdsToExclude,
    namespace,
    context
}: {
    schemas: Record<string, Schema>;
    schemaIdsToExclude: string[];
    namespace: string | undefined;
    context: OpenApiIrConverterContext;
}): void {
    for (const [id, schema] of Object.entries(schemas)) {
        if (schemaIdsToExclude.includes(id)) {
            continue;
        }

        const declarationFile = getDeclarationFileForSchema(schema);
        const typeDeclaration = buildTypeDeclaration({ schema, context, declarationFile, namespace });

        // HACKHACK: Skip self-referencing schemas. I'm not sure if this is the right way to do this.
        if (isRawAliasDefinition(typeDeclaration.schema)) {
            const aliasType = getTypeFromTypeReference(typeDeclaration.schema);
            if (aliasType === (typeDeclaration.name ?? id) || aliasType === `optional<${typeDeclaration.name ?? id}>`) {
                continue;
            }
        }

        context.builder.addType(declarationFile, {
            name: typeDeclaration.name ?? id,
            schema: typeDeclaration.schema
        });
    }
}

export function buildFernDefinition(context: OpenApiIrConverterContext): FernDefinition {
    if (context.ir.apiVersion != null) {
        context.builder.setApiVersion(context.ir.apiVersion);
    }
    buildEnvironments(context);
    buildGlobalHeaders(context);
    buildIdempotencyHeaders(context);
    buildAuthSchemes(context);
    buildVariables(context);
    if (context.ir.basePath != null) {
        context.builder.setBasePath(context.ir.basePath);
    }
    if (context.ir.hasEndpointsMarkedInternal) {
        context.builder.addAudience(EXTERNAL_AUDIENCE);
    }
    const { schemaIdsToExclude, sdkGroups } = buildServices(context);
    buildWebhooks(context);

    // Add Channels
    for (const channel of context.ir.channel) {
        const declarationFile = convertSdkGroupNameToFile(channel.groupName);
        buildChannel({ channel, context, declarationFile });
    }

    // Add Schemas
    addSchemas({ schemas: context.ir.groupedSchemas.rootSchemas, schemaIdsToExclude, namespace: undefined, context });
    for (const [namespace, schemas] of Object.entries(context.ir.groupedSchemas.namespacedSchemas)) {
        addSchemas({ schemas, schemaIdsToExclude, namespace, context });
    }

    if (context.ir.tags.orderedTagIds != null && context.ir.tags.orderedTagIds.length > 0) {
        const containsValidTagIds = context.ir.tags.orderedTagIds.every((tagId) => {
            return sdkGroups.has(tagId);
        });
        if (containsValidTagIds) {
            context.builder.addNavigation({
                navigation: context.ir.tags.orderedTagIds
            });
        }
    }

    return context.builder.build();
}
