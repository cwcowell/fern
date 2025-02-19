<?php

namespace Seed\Types\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;
use Seed\Core\ArrayType;

class Directory extends SerializableType
{
    /**
     * @var string $name
     */
    #[JsonProperty('name')]
    public string $name;

    /**
     * @var ?array<File> $files
     */
    #[JsonProperty('files'), ArrayType([File::class])]
    public ?array $files;

    /**
     * @var ?array<Directory> $directories
     */
    #[JsonProperty('directories'), ArrayType([Directory::class])]
    public ?array $directories;

    /**
     * @param array{
     *   name: string,
     *   files?: ?array<File>,
     *   directories?: ?array<Directory>,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->name = $values['name'];
        $this->files = $values['files'] ?? null;
        $this->directories = $values['directories'] ?? null;
    }
}
