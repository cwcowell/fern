<?php

namespace Seed\Reference;

use Seed\Core\RawClient;
use Seed\Reference\Types\SendRequest;
use Seed\Types\SendResponse;
use Seed\Exceptions\SeedException;
use Seed\Exceptions\SeedApiException;
use Seed\Core\JsonApiRequest;
use Seed\Core\HttpMethod;
use JsonException;
use Psr\Http\Client\ClientExceptionInterface;

class ReferenceClient
{
    /**
     * @var RawClient $client
     */
    private RawClient $client;

    /**
     * @param RawClient $client
     */
    public function __construct(
        RawClient $client,
    ) {
        $this->client = $client;
    }

    /**
     * @param SendRequest $request
     * @param ?array{
     *   baseUrl?: string,
     * } $options
     * @return SendResponse
     * @throws SeedException
     * @throws SeedApiException
     */
    public function send(SendRequest $request, ?array $options = null): SendResponse
    {
        try {
            $response = $this->client->sendRequest(
                new JsonApiRequest(
                    baseUrl: $this->options['baseUrl'] ?? $this->client->options['baseUrl'] ?? '',
                    path: "reference",
                    method: HttpMethod::POST,
                    body: $request,
                ),
            );
            $statusCode = $response->getStatusCode();
            if ($statusCode >= 200 && $statusCode < 400) {
                $json = $response->getBody()->getContents();
                return SendResponse::fromJson($json);
            }
        } catch (JsonException $e) {
            throw new SeedException(message: "Failed to deserialize response: {$e->getMessage()}", previous: $e);
        } catch (ClientExceptionInterface $e) {
            throw new SeedException(message: $e->getMessage(), previous: $e);
        }
        throw new SeedApiException(
            message: 'API request failed',
            statusCode: $statusCode,
            body: $response->getBody()->getContents(),
        );
    }
}
