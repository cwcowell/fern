<?php

namespace Seed\Submission\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;
use Seed\Commons\Types\TestCase;
use Seed\Core\ArrayType;

class TestSubmissionState extends SerializableType
{
    /**
     * @var string $problemId
     */
    #[JsonProperty('problemId')]
    public string $problemId;

    /**
     * @var array<TestCase> $defaultTestCases
     */
    #[JsonProperty('defaultTestCases'), ArrayType([TestCase::class])]
    public array $defaultTestCases;

    /**
     * @var array<TestCase> $customTestCases
     */
    #[JsonProperty('customTestCases'), ArrayType([TestCase::class])]
    public array $customTestCases;

    /**
     * @var mixed $status
     */
    #[JsonProperty('status')]
    public mixed $status;

    /**
     * @param array{
     *   problemId: string,
     *   defaultTestCases: array<TestCase>,
     *   customTestCases: array<TestCase>,
     *   status: mixed,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->problemId = $values['problemId'];
        $this->defaultTestCases = $values['defaultTestCases'];
        $this->customTestCases = $values['customTestCases'];
        $this->status = $values['status'];
    }
}
