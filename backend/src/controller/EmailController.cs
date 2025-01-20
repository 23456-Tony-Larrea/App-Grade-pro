using backend.src.core.entities;
using backend.src.useCases;
using Microsoft.AspNetCore.Mvc;

namespace backend.src.controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly SendEmailUseCase _sendEmailUseCase;

        public EmailController(SendEmailUseCase sendEmailUseCase)
        {
            _sendEmailUseCase = sendEmailUseCase;
        }

        [HttpPost("send")]
        public IActionResult SendEmail([FromBody] EmailRequest request)
        {
            _sendEmailUseCase.Execute(request.To, request.Subject, request.Body);
            return Ok("Email sent successfully!");
        }
    }
}
