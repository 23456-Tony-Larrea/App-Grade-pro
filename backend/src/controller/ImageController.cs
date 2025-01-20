using Microsoft.AspNetCore.Mvc;

namespace backend.src.controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly string _imagePath;
        private readonly long _maxFileSize = 2 * 1024 * 1024; 

        public ImageController()
        {
            _imagePath = Path.Combine(Directory.GetCurrentDirectory(), "images");
            if (!Directory.Exists(_imagePath))
            {
                Directory.CreateDirectory(_imagePath);
            }
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No se proporcionó ninguna imagen.");
            }

            if (file.Length > _maxFileSize) // Validación de tamaño en el controlador
            {
                return BadRequest($"El archivo supera el tamaño máximo permitido de {_maxFileSize / (1024 * 1024)} MB.");
            }

            var permittedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(extension) || !permittedExtensions.Contains(extension))
            {
                return BadRequest("El archivo no tiene un formato permitido.");
            }

            try
            {
                var fileName = Path.GetRandomFileName() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(_imagePath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var relativePath = $"/images/{fileName}";
                return Ok(new { FilePath = relativePath });
            }
            catch
            {
                return StatusCode(500, "Error al guardar el archivo.");
            }
        }
    }
}
