<?php

namespace Seed\V2\V3\Problem\Types;

use Seed\Core\SerializableType;
use Seed\Commons\Types\Language;
use Seed\Core\JsonProperty;
use Seed\Core\ArrayType;

class FunctionImplementationForMultipleLanguages extends SerializableType
{
    /**
     * @var array<Language, FunctionImplementation> $codeByLanguage
     */
    #[JsonProperty('codeByLanguage'), ArrayType([Language::class => FunctionImplementation::class])]
    public array $codeByLanguage;

    /**
     * @param array{
     *   codeByLanguage: array<Language, FunctionImplementation>,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->codeByLanguage = $values['codeByLanguage'];
    }
}
