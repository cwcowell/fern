import { UnnamedArgument } from "@fern-api/generator-commons";
import { php } from "@fern-api/php-codegen";
import { HttpEndpoint, SdkRequest } from "@fern-fern/ir-sdk/api";
import { SdkGeneratorContext } from "../../SdkGeneratorContext";

export interface QueryParameterCodeBlock {
    code: php.CodeBlock;
    queryParameterBagReference: string;
}

export interface HeaderParameterCodeBlock {
    code: php.CodeBlock;
    headerParameterBagReference: string;
}

export interface RequestBodyCodeBlock {
    code?: php.CodeBlock;
    requestBodyReference: php.CodeBlock;
}

export abstract class EndpointRequest {
    public constructor(
        protected readonly context: SdkGeneratorContext,
        protected readonly sdkRequest: SdkRequest,
        protected readonly endpoint: HttpEndpoint
    ) {}

    public getRequestParameterName(): string {
        return `$${this.context.getParameterName(this.sdkRequest.requestParameterName)}`;
    }

    public abstract getRequestParameterType(): php.Type;

    public abstract getQueryParameterCodeBlock(): QueryParameterCodeBlock | undefined;

    public abstract getHeaderParameterCodeBlock(): HeaderParameterCodeBlock | undefined;

    public abstract getRequestBodyCodeBlock(): RequestBodyCodeBlock | undefined;

    protected serializeJsonRequest({ bodyArgument }: { bodyArgument: php.CodeBlock }): php.CodeBlock {
        const requestParameterType = this.getRequestParameterType();
        const isOptional = requestParameterType.isOptional();
        const underlyingType = this.getRequestParameterType().underlyingType();
        const internalType = underlyingType.internalType;
        switch (internalType.type) {
            case "array":
            case "map":
                return this.serializeJsonRequestForArray({
                    bodyArgument,
                    type: underlyingType,
                    isOptional
                });
            case "date":
                return this.serializeJsonRequestForDateTime({
                    bodyArgument,
                    variant: "Date",
                    isOptional
                });
            case "dateTime":
                return this.serializeJsonRequestForDateTime({
                    bodyArgument,
                    variant: "DateTime",
                    isOptional
                });
            case "reference":
            case "int":
            case "float":
            case "string":
            case "bool":
            case "mixed":
            case "object":
            case "optional":
            case "typeDict":
                return bodyArgument;
        }
    }

    private serializeJsonRequestForArray({
        bodyArgument,
        type,
        isOptional
    }: {
        bodyArgument: php.CodeBlock;
        type: php.Type;
        isOptional: boolean;
    }): php.CodeBlock {
        return this.serializeJsonRequestMethod({
            bodyArgument,
            methodInvocation: php.invokeMethod({
                on: this.context.getJsonSerializerClassReference(),
                method: "serializeArray",
                arguments_: [bodyArgument, this.context.phpAttributeMapper.getArrayTypeAttributeArgument(type)],
                static_: true
            }),
            isOptional
        });
    }

    private serializeJsonRequestForDateTime({
        bodyArgument,
        variant,
        isOptional
    }: {
        bodyArgument: php.CodeBlock;
        variant: "Date" | "DateTime";
        isOptional: boolean;
    }): php.CodeBlock {
        return this.serializeJsonRequestMethod({
            bodyArgument,
            methodInvocation: php.invokeMethod({
                on: this.context.getJsonSerializerClassReference(),
                method: `serialize${variant}`,
                arguments_: [bodyArgument],
                static_: true
            }),
            isOptional
        });
    }

    private serializeJsonRequestMethod({
        bodyArgument,
        methodInvocation,
        isOptional
    }: {
        bodyArgument: php.CodeBlock;
        methodInvocation: php.MethodInvocation;
        isOptional: boolean;
    }): php.CodeBlock {
        return php.codeblock((writer) => {
            if (!isOptional) {
                writer.writeNode(methodInvocation);
                return;
            }
            writer.writeNode(
                php.ternary({
                    condition: bodyArgument,
                    true_: methodInvocation,
                    false_: php.codeblock("null")
                })
            );
        });
    }
}
