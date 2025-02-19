<?php

namespace Seed\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;

class EchoRequest extends SerializableType
{
    /**
     * @var string $name
     */
    #[JsonProperty('name')]
    public string $name;

    /**
     * @var int $size
     */
    #[JsonProperty('size')]
    public int $size;

    /**
     * @param array{
     *   name: string,
     *   size: int,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->name = $values['name'];
        $this->size = $values['size'];
    }
}
