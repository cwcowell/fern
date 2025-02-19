<?php

namespace Seed\Package;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;
use Seed\Core\ArrayType;

class Record extends SerializableType
{
    /**
     * @var array<string, string> $foo
     */
    #[JsonProperty('foo'), ArrayType(['string' => 'string'])]
    public array $foo;

    /**
     * @var int $_3D
     */
    #[JsonProperty('3d')]
    public int $_3D;

    /**
     * @param array{
     *   foo: array<string, string>,
     *   _3D: int,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->foo = $values['foo'];
        $this->_3D = $values['_3D'];
    }
}
