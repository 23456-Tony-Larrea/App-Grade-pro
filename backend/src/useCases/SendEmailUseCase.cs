using backend.src.core.interfaces;

namespace backend.src.useCases
{
    public class SendEmailUseCase
    {
        private readonly IEmailService _emailService;

        public SendEmailUseCase(IEmailService emailService)
        {
            _emailService = emailService;
        }

        public void Execute(string to, string subject, string body)
        {
            _emailService.SendEmail(to, subject, body);
        }
    }
}
