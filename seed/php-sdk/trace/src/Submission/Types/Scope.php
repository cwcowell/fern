<?php

namespace Seed\Submission\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;
use Seed\Core\ArrayType;

class Scope extends SerializableType
{
    /**
     * @var array<string, mixed> $variables
     */
    #[JsonProperty('variables'), ArrayType(['string' => 'mixed'])]
    public array $variables;

    /**
     * @param array{
     *   variables: array<string, mixed>,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->variables = $values['variables'];
    }
}
