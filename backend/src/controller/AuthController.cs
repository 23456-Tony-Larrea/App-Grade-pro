using backend.src.core.interfaces;
using backend.src.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.src.controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IAuthServices _authServices;

        public AuthController(IJwtTokenGenerator jwtTokenGenerator, IAuthServices authServices)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _authServices = authServices;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            // Verificar al usuario
            var user = await _authServices.AuthenticateAsync(request.Username, request.Password);
            if (user == null)
            {
                return Unauthorized(new { message = "Username o password es incorrecto" });
            }

            // Generar el token si el usuario es válido
            var token = _jwtTokenGenerator.GenerateToken(request.Username);
            return Ok(new { Token = token, message = "Login successful" });
        }
    }
}
