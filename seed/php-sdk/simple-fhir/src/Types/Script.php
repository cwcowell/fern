<?php

namespace Seed\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;

class Script extends SerializableType
{
    /**
     * @var string $resourceType
     */
    #[JsonProperty('resource_type')]
    public string $resourceType;

    /**
     * @var string $name
     */
    #[JsonProperty('name')]
    public string $name;

    /**
     * @param array{
     *   resourceType: string,
     *   name: string,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->resourceType = $values['resourceType'];
        $this->name = $values['name'];
    }
}
