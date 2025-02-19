<?php

namespace Seed\V2\Problem;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;
use Seed\Problem\ProblemDescription;
use Seed\Core\ArrayType;
use Seed\Commons\Language;

class CreateProblemRequestV2 extends SerializableType
{
    /**
     * @var string $problemName
     */
    #[JsonProperty('problemName')]
    public string $problemName;

    /**
     * @var ProblemDescription $problemDescription
     */
    #[JsonProperty('problemDescription')]
    public ProblemDescription $problemDescription;

    /**
     * @var mixed $customFiles
     */
    #[JsonProperty('customFiles')]
    public mixed $customFiles;

    /**
     * @var array<TestCaseTemplate> $customTestCaseTemplates
     */
    #[JsonProperty('customTestCaseTemplates'), ArrayType([TestCaseTemplate::class])]
    public array $customTestCaseTemplates;

    /**
     * @var array<TestCaseV2> $testcases
     */
    #[JsonProperty('testcases'), ArrayType([TestCaseV2::class])]
    public array $testcases;

    /**
     * @var array<Language> $supportedLanguages
     */
    #[JsonProperty('supportedLanguages'), ArrayType([Language::class])]
    public array $supportedLanguages;

    /**
     * @var bool $isPublic
     */
    #[JsonProperty('isPublic')]
    public bool $isPublic;

    /**
     * @param array{
     *   problemName: string,
     *   problemDescription: ProblemDescription,
     *   customFiles: mixed,
     *   customTestCaseTemplates: array<TestCaseTemplate>,
     *   testcases: array<TestCaseV2>,
     *   supportedLanguages: array<Language>,
     *   isPublic: bool,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->problemName = $values['problemName'];
        $this->problemDescription = $values['problemDescription'];
        $this->customFiles = $values['customFiles'];
        $this->customTestCaseTemplates = $values['customTestCaseTemplates'];
        $this->testcases = $values['testcases'];
        $this->supportedLanguages = $values['supportedLanguages'];
        $this->isPublic = $values['isPublic'];
    }
}
