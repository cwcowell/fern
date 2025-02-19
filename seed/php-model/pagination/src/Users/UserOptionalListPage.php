<?php

namespace Seed\Users;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;

class UserOptionalListPage extends SerializableType
{
    /**
     * @var UserOptionalListContainer $data
     */
    #[JsonProperty('data')]
    public UserOptionalListContainer $data;

    /**
     * @var ?string $next
     */
    #[JsonProperty('next')]
    public ?string $next;

    /**
     * @param array{
     *   data: UserOptionalListContainer,
     *   next?: ?string,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->data = $values['data'];
        $this->next = $values['next'] ?? null;
    }
}
