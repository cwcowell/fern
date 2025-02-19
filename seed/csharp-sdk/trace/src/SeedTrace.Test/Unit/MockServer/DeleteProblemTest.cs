using NUnit.Framework;

#nullable enable

namespace SeedTrace.Test.Unit.MockServer;

[TestFixture]
public class DeleteProblemTest : BaseMockServerTest
{
    [Test]
    public void MockServerTest()
    {
        Server
            .Given(
                WireMock
                    .RequestBuilders.Request.Create()
                    .WithPath("/problem-crud/delete/string")
                    .UsingDelete()
            )
            .RespondWith(WireMock.ResponseBuilders.Response.Create().WithStatusCode(200));

        Assert.DoesNotThrowAsync(
            async () => await Client.Problem.DeleteProblemAsync("string", RequestOptions)
        );
    }
}
