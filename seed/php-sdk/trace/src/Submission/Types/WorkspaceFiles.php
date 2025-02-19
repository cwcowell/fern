<?php

namespace Seed\Submission\Types;

use Seed\Core\SerializableType;
use Seed\Commons\Types\FileInfo;
use Seed\Core\JsonProperty;
use Seed\Core\ArrayType;

class WorkspaceFiles extends SerializableType
{
    /**
     * @var FileInfo $mainFile
     */
    #[JsonProperty('mainFile')]
    public FileInfo $mainFile;

    /**
     * @var array<FileInfo> $readOnlyFiles
     */
    #[JsonProperty('readOnlyFiles'), ArrayType([FileInfo::class])]
    public array $readOnlyFiles;

    /**
     * @param array{
     *   mainFile: FileInfo,
     *   readOnlyFiles: array<FileInfo>,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->mainFile = $values['mainFile'];
        $this->readOnlyFiles = $values['readOnlyFiles'];
    }
}
