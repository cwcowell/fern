using System.Net.Http;
using System.Text.Json;
using System.Threading;
using SeedAnyAuth.Core;

#nullable enable

namespace SeedAnyAuth;

public partial class AuthClient
{
    private RawClient _client;

    internal AuthClient(RawClient client)
    {
        _client = client;
    }

    /// <example>
    /// <code>
    /// await client.Auth.GetTokenAsync(
    ///     new GetTokenRequest
    ///     {
    ///         ClientId = "string",
    ///         ClientSecret = "string",
    ///         Audience = "https://api.example.com",
    ///         GrantType = "client_credentials",
    ///         Scope = "string",
    ///     }
    /// );
    /// </code>
    /// </example>
    public async Task<TokenResponse> GetTokenAsync(
        GetTokenRequest request,
        RequestOptions? options = null,
        CancellationToken cancellationToken = default
    )
    {
        var response = await _client.MakeRequestAsync(
            new RawClient.JsonApiRequest
            {
                BaseUrl = _client.Options.BaseUrl,
                Method = HttpMethod.Post,
                Path = "/token",
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
                return JsonUtils.Deserialize<TokenResponse>(responseBody)!;
            }
            catch (JsonException e)
            {
                throw new SeedAnyAuthException("Failed to deserialize response", e);
            }
        }

        throw new SeedAnyAuthApiException(
            $"Error with status code {response.StatusCode}",
            response.StatusCode,
            responseBody
        );
    }
}
