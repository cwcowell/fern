<?php

namespace Seed\FolderD\Service\Types;

use Seed\Core\SerializableType;
use Seed\FolderB\Common\Types\Foo;
use Seed\Core\JsonProperty;

class Response extends SerializableType
{
    /**
     * @var ?Foo $foo
     */
    #[JsonProperty('foo')]
    public ?Foo $foo;

    /**
     * @param array{
     *   foo?: ?Foo,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->foo = $values['foo'] ?? null;
    }
}
