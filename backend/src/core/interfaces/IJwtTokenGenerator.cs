namespace backend.src.core.interfaces
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(string username);
    }
}
