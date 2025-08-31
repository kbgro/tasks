using System.ComponentModel.DataAnnotations;

namespace Tasks.DTO
{
    public class LoginRequest
    {
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public required string Password { get; set; }

    }
}
