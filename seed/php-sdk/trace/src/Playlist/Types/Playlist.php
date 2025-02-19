<?php

namespace Seed\Playlist\Types;

use Seed\Core\SerializableType;
use Seed\Core\JsonProperty;

class Playlist extends SerializableType
{
    /**
     * @var string $playlistId
     */
    #[JsonProperty('playlist_id')]
    public string $playlistId;

    /**
     * @var string $ownerId
     */
    #[JsonProperty('owner-id')]
    public string $ownerId;

    /**
     * @param array{
     *   playlistId: string,
     *   ownerId: string,
     * } $values
     */
    public function __construct(
        array $values,
    ) {
        $this->playlistId = $values['playlistId'];
        $this->ownerId = $values['ownerId'];
    }
}
