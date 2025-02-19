/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "../../../../core";
import * as SeedBasicAuth from "../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../serialization/index";
import * as errors from "../../../../errors/index";

export declare namespace BasicAuth {
    interface Options {
        environment: core.Supplier<string>;
        username: core.Supplier<string>;
        password: core.Supplier<string>;
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

export class BasicAuth {
    constructor(protected readonly _options: BasicAuth.Options) {}

    /**
     * GET request with basic auth scheme
     *
     * @param {BasicAuth.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link SeedBasicAuth.UnauthorizedRequest}
     *
     * @example
     *     await client.basicAuth.getWithBasicAuth()
     */
    public async getWithBasicAuth(requestOptions?: BasicAuth.RequestOptions): Promise<boolean> {
        const _response = await core.fetcher({
            url: urlJoin(await core.Supplier.get(this._options.environment), "basic-auth"),
            method: "GET",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/basic-auth",
                "X-Fern-SDK-Version": "0.0.1",
                "User-Agent": "@fern/basic-auth/0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.basicAuth.getWithBasicAuth.Response.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 401:
                    throw new SeedBasicAuth.UnauthorizedRequest(
                        serializers.UnauthorizedRequestErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                default:
                    throw new errors.SeedBasicAuthError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedBasicAuthError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedBasicAuthTimeoutError();
            case "unknown":
                throw new errors.SeedBasicAuthError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * POST request with basic auth scheme
     *
     * @param {unknown} request
     * @param {BasicAuth.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link SeedBasicAuth.UnauthorizedRequest}
     * @throws {@link SeedBasicAuth.BadRequest}
     *
     * @example
     *     await client.basicAuth.postWithBasicAuth({
     *         "key": "value"
     *     })
     */
    public async postWithBasicAuth(request?: unknown, requestOptions?: BasicAuth.RequestOptions): Promise<boolean> {
        const _response = await core.fetcher({
            url: urlJoin(await core.Supplier.get(this._options.environment), "basic-auth"),
            method: "POST",
            headers: {
                Authorization: await this._getAuthorizationHeader(),
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/basic-auth",
                "X-Fern-SDK-Version": "0.0.1",
                "User-Agent": "@fern/basic-auth/0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            requestType: "json",
            body: request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.basicAuth.postWithBasicAuth.Response.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 401:
                    throw new SeedBasicAuth.UnauthorizedRequest(
                        serializers.UnauthorizedRequestErrorBody.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        })
                    );
                case 400:
                    throw new SeedBasicAuth.BadRequest();
                default:
                    throw new errors.SeedBasicAuthError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedBasicAuthError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedBasicAuthTimeoutError();
            case "unknown":
                throw new errors.SeedBasicAuthError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getAuthorizationHeader(): Promise<string | undefined> {
        return core.BasicAuth.toAuthorizationHeader({
            username: await core.Supplier.get(this._options.username),
            password: await core.Supplier.get(this._options.password),
        });
    }
}
