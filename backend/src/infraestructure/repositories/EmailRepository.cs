using backend.src.core.interfaces;
using System.Net.Mail;
using System.Net;
using backend.src.core.entities;
using Microsoft.Extensions.Options;

namespace backend.src.infraestructure.repositories
{
    public class EmailRepository : IEmailService
    {
        private readonly SmtpSettings _smtpSettings;

        public EmailRepository(IOptions<SmtpSettings> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
        }

        public void SendEmail(string to, string subject, string body)
        {
            var smtpClient = new SmtpClient(_smtpSettings.HOST_GMAIL)
            {
                Port = _smtpSettings.PORT_GMAIL,
                Credentials = new NetworkCredential(_smtpSettings.EMAIL_USER, _smtpSettings.EMAIL_PASSWORD),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpSettings.EMAIL_USER),
                Subject = subject,
                Body = body,
                IsBodyHtml = false
            };

            mailMessage.To.Add(to);

            smtpClient.Send(mailMessage);
        }
    }
}