<?php

namespace Seed\Commons\Types\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;
use Seed\Core\ArrayType;

class Metadata extends SerializableType
{
    /**
     * @var string $id
     */
    #[JsonProperty('id')]
    public string $id;

    /**
     * @var ?array<string, string> $data
     */
    #[JsonProperty('data'), ArrayType(['string' => 'string'])]
    public ?array $data;

    /**
     * @var ?string $jsonString
     */
    #[JsonProperty('jsonString')]
    public ?string $jsonString;

    /**
     * @param array{
     *   id: string,
     *   data?: ?array<string, string>,
     *   jsonString?: ?string,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->id = $values['id'];
        $this->data = $values['data'] ?? null;
        $this->jsonString = $values['jsonString'] ?? null;
    }
}
