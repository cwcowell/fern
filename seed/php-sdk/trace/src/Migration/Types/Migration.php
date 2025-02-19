<?php

namespace Seed\Migration\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;

class Migration extends SerializableType
{
    /**
     * @var string $name
     */
    #[JsonProperty('name')]
    public string $name;

    /**
     * @var MigrationStatus $status
     */
    #[JsonProperty('status')]
    public MigrationStatus $status;

    /**
     * @param array{
     *   name: string,
     *   status: MigrationStatus,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->name = $values['name'];
        $this->status = $values['status'];
    }
}
