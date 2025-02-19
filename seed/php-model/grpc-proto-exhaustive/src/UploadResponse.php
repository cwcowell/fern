<?php

namespace Seed;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;

class UploadResponse extends SerializableType
{
    /**
     * @var ?int $count
     */
    #[JsonProperty('count')]
    public ?int $count;

    /**
     * @param array{
     *   count?: ?int,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->count = $values['count'] ?? null;
    }
}
