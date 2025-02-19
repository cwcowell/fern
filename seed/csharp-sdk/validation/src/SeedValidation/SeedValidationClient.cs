using System.Net.Http;
using System.Text.Json;
using System.Threading;
using SeedValidation.Core;

#nullable enable

namespace SeedValidation;

public partial class SeedValidationClient
{
    private RawClient _client;

    public SeedValidationClient(ClientOptions? clientOptions = null)
    {
        var defaultHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "X-Fern-Language", "C#" },
                { "X-Fern-SDK-Name", "SeedValidation" },
                { "X-Fern-SDK-Version", Version.Current },
                { "User-Agent", "Fernvalidation/0.0.1" },
            }
        );
        clientOptions ??= new ClientOptions();
        foreach (var header in defaultHeaders)
        {
            if (!clientOptions.Headers.ContainsKey(header.Key))
            {
                clientOptions.Headers[header.Key] = header.Value;
            }
        }
        _client = new RawClient(clientOptions);
    }

    /// <example>
    /// <code>
    /// await client.CreateAsync(
    ///     new CreateRequest
    ///     {
    ///         Decimal = 1.1,
    ///         Even = 1,
    ///         Name = "string",
    ///         Shape = Shape.Square,
    ///     }
    /// );
    /// </code>
    /// </example>
    public async Task<Type> CreateAsync(
        CreateRequest request,
        RequestOptions? options = null,
        CancellationToken cancellationToken = default
    )
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                BaseUrl = _client.Options.BaseUrl,
                Method = HttpMethod.Post,
                Path = "/create",
                Body = request,
                Options = options,
            },
            cancellationToken
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            try
            {
                return JsonUtils.Deserialize<Type>(responseBody)!;
            }
            catch (JsonException e)
            {
                throw new SeedValidationException("Failed to deserialize response", e);
            }
        }

        throw new SeedValidationApiException(
            $"Error with status code {response.StatusCode}",
            response.StatusCode,
            responseBody
        );
    }

    /// <example>
    /// <code>
    /// await client.GetAsync(
    ///     new GetRequest
    ///     {
    ///         Decimal = 1.1,
    ///         Even = 1,
    ///         Name = "string",
    ///     }
    /// );
    /// </code>
    /// </example>
    public async Task<Type> GetAsync(
        GetRequest request,
        RequestOptions? options = null,
        CancellationToken cancellationToken = default
    )
    {
        var _query = new Dictionary<string, object>();
        _query["decimal"] = request.Decimal.ToString();
        _query["even"] = request.Even.ToString();
        _query["name"] = request.Name;
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                BaseUrl = _client.Options.BaseUrl,
                Method = HttpMethod.Get,
                Path = "",
                Query = _query,
                Options = options,
            },
            cancellationToken
        );
        var responseBody = await response.Raw.Content.ReadAsStringAsync();
        if (response.StatusCode is >= 200 and < 400)
        {
            try
            {
                return JsonUtils.Deserialize<Type>(responseBody)!;
            }
            catch (JsonException e)
            {
                throw new SeedValidationException("Failed to deserialize response", e);
            }
        }

        throw new SeedValidationApiException(
            $"Error with status code {response.StatusCode}",
            response.StatusCode,
            responseBody
        );
    }
}
