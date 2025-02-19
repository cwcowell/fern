using NUnit.Framework;
using SeedTrace;

#nullable enable

namespace SeedTrace.Test.Unit.MockServer;

[TestFixture]
public class StoreTracedTestCaseV2Test : BaseMockServerTest
{
    [Test]
    public void MockServerTest()
    {
        const string requestJson = """
            [
              {
                "submissionId": "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                "lineNumber": 1,
                "file": {
                  "filename": "string",
                  "directory": "string"
                },
                "returnValue": {
                  "type": "integerValue"
                },
                "expressionLocation": {
                  "start": 1,
                  "offset": 1
                },
                "stack": {
                  "numStackFrames": 1,
                  "topStackFrame": {
                    "methodName": "string",
                    "lineNumber": 1,
                    "scopes": [
                      {
                        "variables": {}
                      }
                    ]
                  }
                },
                "stdout": "string"
              }
            ]
            """;

        Server
            .Given(
                WireMock
                    .RequestBuilders.Request.Create()
                    .WithPath(
                        "/admin/store-test-trace-v2/submission/d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32/testCase/string"
                    )
                    .UsingPost()
                    .WithBodyAsJson(requestJson)
            )
            .RespondWith(WireMock.ResponseBuilders.Response.Create().WithStatusCode(200));

        Assert.DoesNotThrowAsync(
            async () =>
                await Client.Admin.StoreTracedTestCaseV2Async(
                    "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                    "string",
                    new List<TraceResponseV2>()
                    {
                        new TraceResponseV2
                        {
                            SubmissionId = "d5e9c84f-c2b2-4bf4-b4b0-7ffd7a9ffc32",
                            LineNumber = 1,
                            File = new TracedFile { Filename = "string", Directory = "string" },
                            ReturnValue = 1,
                            ExpressionLocation = new ExpressionLocation { Start = 1, Offset = 1 },
                            Stack = new StackInformation
                            {
                                NumStackFrames = 1,
                                TopStackFrame = new StackFrame
                                {
                                    MethodName = "string",
                                    LineNumber = 1,
                                    Scopes = new List<Scope>()
                                    {
                                        new Scope
                                        {
                                            Variables = new Dictionary<string, object>() { },
                                        },
                                    },
                                },
                            },
                            Stdout = "string",
                        },
                    },
                    RequestOptions
                )
        );
    }
}
