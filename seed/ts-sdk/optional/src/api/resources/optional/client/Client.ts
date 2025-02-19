/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "../../../../core";
import * as serializers from "../../../../serialization/index";
import urlJoin from "url-join";
import * as errors from "../../../../errors/index";

export declare namespace Optional {
    interface Options {
        environment: core.Supplier<string>;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
    }
}

export class Optional {
    constructor(protected readonly _options: Optional.Options) {}

    /**
     * @param {Record<string, unknown>} request
     * @param {Optional.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.optional.sendOptionalBody({
     *         "string": {
     *             "key": "value"
     *         }
     *     })
     */
    public async sendOptionalBody(
        request?: Record<string, unknown>,
        requestOptions?: Optional.RequestOptions
    ): Promise<string> {
        const _response = await core.fetcher({
            url: urlJoin(await core.Supplier.get(this._options.environment), "send-optional-body"),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/optional",
                "X-Fern-SDK-Version": "0.0.1",
                "User-Agent": "@fern/optional/0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            body:
                request != null
                    ? serializers.optional.sendOptionalBody.Request.jsonOrThrow(request, {
                          unrecognizedObjectKeys: "strip",
                      })
                    : undefined,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.optional.sendOptionalBody.Response.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedObjectsWithImportsError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedObjectsWithImportsError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedObjectsWithImportsTimeoutError();
            case "unknown":
                throw new errors.SeedObjectsWithImportsError({
                    message: _response.error.errorMessage,
                });
        }
    }
}
