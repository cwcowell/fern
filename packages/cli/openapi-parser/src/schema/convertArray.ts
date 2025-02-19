import { Availability, SchemaWithExample, SdkGroupName, Source } from "@fern-api/openapi-ir-sdk";
import { OpenAPIV3 } from "openapi-types";
import { convertSchema } from "./convertSchemas";
import { SchemaParserContext } from "./SchemaParserContext";

export function convertArray({
    nameOverride,
    generatedName,
    title,
    breadcrumbs,
    item,
    description,
    availability,
    wrapAsNullable,
    context,
    groupName,
    example,
    source,
    namespace
}: {
    nameOverride: string | undefined;
    generatedName: string;
    title: string | undefined;
    breadcrumbs: string[];
    item: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | undefined;
    description: string | undefined;
    availability: Availability | undefined;
    wrapAsNullable: boolean;
    context: SchemaParserContext;
    groupName: SdkGroupName | undefined;
    example: unknown[] | undefined;
    source: Source;
    namespace: string | undefined;
}): SchemaWithExample {
    const itemSchema =
        item == null
            ? SchemaWithExample.unknown({
                  nameOverride,
                  generatedName,
                  title,
                  description: undefined,
                  availability: undefined,
                  example: undefined,
                  groupName
              })
            : convertSchema(item, false, context, [...breadcrumbs, "Item"], source, namespace);
    return wrapArray({
        nameOverride,
        generatedName,
        title,
        groupName,
        itemSchema,
        wrapAsNullable,
        description,
        availability,
        example
    });
}

export function wrapArray({
    nameOverride,
    generatedName,
    title,
    itemSchema,
    wrapAsNullable,
    description,
    availability,
    groupName,
    example
}: {
    nameOverride: string | undefined;
    generatedName: string;
    title: string | undefined;
    itemSchema: SchemaWithExample;
    wrapAsNullable: boolean;
    description: string | undefined;
    availability: Availability | undefined;
    groupName: SdkGroupName | undefined;
    example: unknown[] | undefined;
}): SchemaWithExample {
    if (wrapAsNullable) {
        return SchemaWithExample.nullable({
            nameOverride,
            generatedName,
            title,
            value: SchemaWithExample.array({
                nameOverride,
                generatedName,
                title,
                value: itemSchema,
                description,
                availability,
                groupName,
                example
            }),
            description,
            availability,
            groupName
        });
    }
    return SchemaWithExample.array({
        nameOverride,
        generatedName,
        title,
        value: itemSchema,
        description,
        availability,
        groupName,
        example
    });
}
