<?php

namespace Seed\Submission\Types;

use Seed\Core\SerializableType;
use Seed\Commons\Types\Language;
use Seed\Core\JsonProperty;
use Seed\Core\ArrayType;

class WorkspaceStarterFilesResponse extends SerializableType
{
    /**
     * @var array<Language, WorkspaceFiles> $files
     */
    #[JsonProperty('files'), ArrayType([Language::class => WorkspaceFiles::class])]
    public array $files;

    /**
     * @param array{
     *   files: array<Language, WorkspaceFiles>,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->files = $values['files'];
    }
}
