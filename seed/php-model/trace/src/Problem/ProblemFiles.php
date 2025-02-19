<?php

namespace Seed\Problem;

use Seed\Core\SerializableType;
use Seed\Commons\FileInfo;
use Seed\Core\JsonProperty;
use Seed\Core\ArrayType;

class ProblemFiles extends SerializableType
{
    /**
     * @var FileInfo $solutionFile
     */
    #[JsonProperty('solutionFile')]
    public FileInfo $solutionFile;

    /**
     * @var array<FileInfo> $readOnlyFiles
     */
    #[JsonProperty('readOnlyFiles'), ArrayType([FileInfo::class])]
    public array $readOnlyFiles;

    /**
     * @param array{
     *   solutionFile: FileInfo,
     *   readOnlyFiles: array<FileInfo>,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->solutionFile = $values['solutionFile'];
        $this->readOnlyFiles = $values['readOnlyFiles'];
    }
}
