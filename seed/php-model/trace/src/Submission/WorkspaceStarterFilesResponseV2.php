<?php

namespace Seed\Submission;

use Seed\Core\SerializableType;
use Seed\Commons\Language;
use Seed\V2\Problem\Files;
use Seed\Core\JsonProperty;
use Seed\Core\ArrayType;

class WorkspaceStarterFilesResponseV2 extends SerializableType
{
    /**
     * @var array<Language, Files> $filesByLanguage
     */
    #[JsonProperty('filesByLanguage'), ArrayType([Language::class => Files::class])]
    public array $filesByLanguage;

    /**
     * @param array{
     *   filesByLanguage: array<Language, Files>,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->filesByLanguage = $values['filesByLanguage'];
    }
}
