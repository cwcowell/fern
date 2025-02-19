<?php

namespace Seed\V2\Problem\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;

class GetGeneratedTestCaseTemplateFileRequest extends SerializableType
{
    /**
     * @var TestCaseTemplate $template
     */
    #[JsonProperty('template')]
    public TestCaseTemplate $template;

    /**
     * @param array{
     *   template: TestCaseTemplate,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->template = $values['template'];
    }
}
