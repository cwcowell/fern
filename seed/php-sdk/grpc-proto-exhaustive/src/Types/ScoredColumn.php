<?php

namespace Seed\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;
use Seed\Core\ArrayType;

class ScoredColumn extends SerializableType
{
    /**
     * @var string $id
     */
    #[JsonProperty('id')]
    public string $id;

    /**
     * @var ?float $score
     */
    #[JsonProperty('score')]
    public ?float $score;

    /**
     * @var ?array<float> $values
     */
    #[JsonProperty('values'), ArrayType(['float'])]
    public ?array $values;

    /**
     * @var mixed $metadata
     */
    #[JsonProperty('metadata')]
    public mixed $metadata;

    /**
     * @var ?IndexedData $indexedData
     */
    #[JsonProperty('indexedData')]
    public ?IndexedData $indexedData;

    /**
     * @param array{
     *   id: string,
     *   score?: ?float,
     *   values?: ?array<float>,
     *   metadata: mixed,
     *   indexedData?: ?IndexedData,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->id = $values['id'];
        $this->score = $values['score'] ?? null;
        $this->values = $values['values'] ?? null;
        $this->metadata = $values['metadata'];
        $this->indexedData = $values['indexedData'] ?? null;
    }
}
