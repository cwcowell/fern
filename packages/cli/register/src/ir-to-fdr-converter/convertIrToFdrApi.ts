import { entries } from "@fern-api/core-utils";
import { IntermediateRepresentation } from "@fern-api/ir-sdk";
import { FernRegistry as FdrCjsSdk } from "@fern-fern/fdr-cjs-sdk";
import { PlaygroundConfig } from "@fern-fern/fdr-cjs-sdk/api/resources/docs/resources/v1/resources/commons";
import { convertIrAvailability, convertPackage } from "./convertPackage";
import { convertTypeReference, convertTypeShape } from "./convertTypeShape";
import { convertAuth } from "./covertAuth";

export function convertIrToFdrApi({
    ir,
    snippetsConfig,
    playgroundConfig
}: {
    ir: IntermediateRepresentation;
    snippetsConfig: FdrCjsSdk.api.v1.register.SnippetsConfig;
    playgroundConfig?: PlaygroundConfig;
}): FdrCjsSdk.api.v1.register.ApiDefinition {
    const fdrApi: FdrCjsSdk.api.v1.register.ApiDefinition = {
        types: {},
        subpackages: {},
        rootPackage: convertPackage(ir.rootPackage, ir),
        auth: convertAuth(ir.auth, ir, playgroundConfig),
        snippetsConfiguration: snippetsConfig,
        globalHeaders: ir.headers.map(
            (header): FdrCjsSdk.api.v1.register.Header => ({
                description: header.docs ?? undefined,
                key: header.name.wireValue,
                type: convertTypeReference(header.valueType)
            })
        )
    };

    for (const [typeId, type] of entries(ir.types)) {
        fdrApi.types[typeId] = {
            description: type.docs ?? undefined,
            name: type.name.name.originalName,
            shape: convertTypeShape(type.shape),
            availability: convertIrAvailability(type.availability)
        };
    }

    for (const [subpackageId, subpackage] of entries(ir.subpackages)) {
        const service = subpackage.service != null ? ir.services[subpackage.service] : undefined;
        fdrApi.subpackages[subpackageId] = {
            subpackageId,
            displayName: service?.displayName,
            name: subpackage.name.originalName,
            description: subpackage.docs ?? undefined,
            ...convertPackage(subpackage, ir)
        };
    }

    return fdrApi;
}
