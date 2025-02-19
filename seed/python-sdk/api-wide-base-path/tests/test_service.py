# This file was auto-generated by Fern from our API Definition.

from seed import SeedApiWideBasePath
from seed import AsyncSeedApiWideBasePath


async def test_post(client: SeedApiWideBasePath, async_client: AsyncSeedApiWideBasePath) -> None:
    # Type ignore to avoid mypy complaining about the function not being meant to return a value
    assert (
        client.service.post(path_param="string", service_param="string", resource_param="string", endpoint_param=1)  # type: ignore[func-returns-value]
        is None
    )

    assert (
        await async_client.service.post(
            path_param="string", service_param="string", resource_param="string", endpoint_param=1
        )  # type: ignore[func-returns-value]
        is None
    )
