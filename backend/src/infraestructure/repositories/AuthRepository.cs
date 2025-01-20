using backend.src.core.entities;
using backend.src.core.interfaces;
using backend.src.infraestructure.data;
using System.Threading.Tasks;

namespace backend.src.infraestructure.repositories
{
    public class AuthRepository : IAuthServices
    {
        private readonly AppDbContext _context;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public AuthRepository(AppDbContext context, IJwtTokenGenerator jwtTokenGenerator)
        {
            _context = context;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<LoginRequest> AuthenticateAsync(string username, string password)
        {
            // Valores quemados (hardcoded) para prueba
            var validUsername = "admin1";
            var validPassword = "password1";

            // Verificar si el username y password coinciden con los valores quemados
            if (username == validUsername && password == validPassword)
            {
                // Generar el token si las credenciales son válidas
                var token = _jwtTokenGenerator.GenerateToken(username);
                return new LoginRequest
                {
                    Username = username,
                    Token = token
                };
            }

            return null; // Usuario no válido
        }
    }
}
