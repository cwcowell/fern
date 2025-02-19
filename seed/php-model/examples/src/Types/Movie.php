<?php

namespace Seed\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;
use Seed\Core\ArrayType;

class Movie extends SerializableType
{
    /**
     * @var string $id
     */
    #[JsonProperty('id')]
    public string $id;

    /**
     * @var ?string $prequel
     */
    #[JsonProperty('prequel')]
    public ?string $prequel;

    /**
     * @var string $title
     */
    #[JsonProperty('title')]
    public string $title;

    /**
     * @var string $from
     */
    #[JsonProperty('from')]
    public string $from;

    /**
     * @var float $rating The rating scale is one to five stars
     */
    #[JsonProperty('rating')]
    public float $rating;

    /**
     * @var string $type
     */
    #[JsonProperty('type')]
    public string $type;

    /**
     * @var string $tag
     */
    #[JsonProperty('tag')]
    public string $tag;

    /**
     * @var ?string $book
     */
    #[JsonProperty('book')]
    public ?string $book;

    /**
     * @var array<string, mixed> $metadata
     */
    #[JsonProperty('metadata'), ArrayType(['string' => 'mixed'])]
    public array $metadata;

    /**
     * @var int $revenue
     */
    #[JsonProperty('revenue')]
    public int $revenue;

    /**
     * @param array{
     *   id: string,
     *   prequel?: ?string,
     *   title: string,
     *   from: string,
     *   rating: float,
     *   type: string,
     *   tag: string,
     *   book?: ?string,
     *   metadata: array<string, mixed>,
     *   revenue: int,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->id = $values['id'];
        $this->prequel = $values['prequel'] ?? null;
        $this->title = $values['title'];
        $this->from = $values['from'];
        $this->rating = $values['rating'];
        $this->type = $values['type'];
        $this->tag = $values['tag'];
        $this->book = $values['book'] ?? null;
        $this->metadata = $values['metadata'];
        $this->revenue = $values['revenue'];
    }
}
