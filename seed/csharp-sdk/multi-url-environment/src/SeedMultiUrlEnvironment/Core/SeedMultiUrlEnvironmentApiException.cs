namespace SeedMultiUrlEnvironment.Core;

/// <summary>
/// This exception type will be thrown for any non-2XX API responses.
/// </summary>
public class SeedMultiUrlEnvironmentApiException(string message, int statusCode, object body)
    : SeedMultiUrlEnvironmentException(message)
{
    /// <summary>
    /// The error code of the response that triggered the exception.
    /// </summary>
    public int StatusCode => statusCode;

    /// <summary>
    /// The body of the response that triggered the exception.
    /// </summary>
<<<<<<< HEAD
    public object Body => body;

    public override string ToString()
    {
        return $"SeedMultiUrlEnvironmentApiException {{ message: {Message}, statusCode: {StatusCode}, body: {Body} }}";
    }
=======
    public object Body { get; } = body;
>>>>>>> main
}
