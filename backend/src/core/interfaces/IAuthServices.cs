using backend.src.core.entities;

namespace backend.src.core.interfaces
{
    public interface IAuthServices
    {
        Task<LoginRequest> AuthenticateAsync(string username, string password);
    }
}
