<?php

namespace Seed\Service\Requests;

class GetMetadataRequest
{
    /**
     * @var string $xApiVersion
     */
    public string $xApiVersion;

    /**
     * @var ?bool $shallow
     */
    public ?bool $shallow;

    /**
     * @var array<?string> $tag
     */
    public array $tag;

    /**
     * @param array{
     *   xApiVersion: string,
     *   shallow?: ?bool,
     *   tag: array<?string>,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->xApiVersion = $values['xApiVersion'];
        $this->shallow = $values['shallow'] ?? null;
        $this->tag = $values['tag'];
    }
}
