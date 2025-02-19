<?php

namespace Seed\LangServer\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;

class LangServerResponse extends SerializableType
{
    /**
     * @var mixed $response
     */
    #[JsonProperty('response')]
    public mixed $response;

    /**
     * @param array{
     *   response: mixed,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->response = $values['response'];
    }
}
