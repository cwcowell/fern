using System.Threading.Tasks;
using FluentAssertions.Json;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using SeedTrace;
using SeedTrace.Core;

#nullable enable

namespace SeedTrace.Test.Unit.MockServer;

[TestFixture]
public class GetDefaultStarterFilesTest : BaseMockServerTest
{
    [Test]
    public async Task MockServerTest()
    {
        const string requestJson = """
            {
              "inputParams": [
                {
                  "variableType": {
                    "type": "integerType"
                  },
                  "name": "string"
                }
              ],
              "outputType": {
                "type": "integerType"
              },
              "methodName": "string"
            }
            """;

        const string mockResponse = """
            {
              "files": {
                "string": {
                  "solutionFile": {
                    "filename": "string",
                    "contents": "string"
                  },
                  "readOnlyFiles": [
                    {
                      "filename": "string",
                      "contents": "string"
                    }
                  ]
                }
              }
            }
            """;

        Server
            .Given(
                WireMock
                    .RequestBuilders.Request.Create()
                    .WithPath("/problem-crud/default-starter-files")
                    .UsingPost()
                    .WithBodyAsJson(requestJson)
            )
            .RespondWith(
                WireMock
                    .ResponseBuilders.Response.Create()
                    .WithStatusCode(200)
                    .WithBody(mockResponse)
            );

        var response = await Client.Problem.GetDefaultStarterFilesAsync(
            new GetDefaultStarterFilesRequest
            {
                InputParams = new List<VariableTypeAndName>()
                {
                    new VariableTypeAndName
                    {
                        VariableType = "no-properties-union",
                        Name = "string",
                    },
                },
                OutputType = "no-properties-union",
                MethodName = "string",
            },
            RequestOptions
        );
        JToken
            .Parse(mockResponse)
            .Should()
            .BeEquivalentTo(JToken.Parse(JsonUtils.Serialize(response)));
    }
}
