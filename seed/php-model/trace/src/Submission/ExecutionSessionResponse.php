<?php

namespace Seed\Submission;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;
use Seed\Commons\Language;

class ExecutionSessionResponse extends SerializableType
{
    /**
     * @var string $sessionId
     */
    #[JsonProperty('sessionId')]
    public string $sessionId;

    /**
     * @var ?string $executionSessionUrl
     */
    #[JsonProperty('executionSessionUrl')]
    public ?string $executionSessionUrl;

    /**
     * @var Language $language
     */
    #[JsonProperty('language')]
    public Language $language;

    /**
     * @var ExecutionSessionStatus $status
     */
    #[JsonProperty('status')]
    public ExecutionSessionStatus $status;

    /**
     * @param array{
     *   sessionId: string,
     *   executionSessionUrl?: ?string,
     *   language: Language,
     *   status: ExecutionSessionStatus,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->sessionId = $values['sessionId'];
        $this->executionSessionUrl = $values['executionSessionUrl'] ?? null;
        $this->language = $values['language'];
        $this->status = $values['status'];
    }
}
