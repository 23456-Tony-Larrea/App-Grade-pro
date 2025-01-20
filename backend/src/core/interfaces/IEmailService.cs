namespace backend.src.core.interfaces
{
    public interface IEmailService
    {
        void SendEmail(string to , string subject , string body);
    }
}
