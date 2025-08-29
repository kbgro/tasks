using System.ComponentModel.DataAnnotations;

namespace Tasks.DTO
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$", 
            ErrorMessage = "Password must be at least one upper case, at least one lower case, at least one digit and a minimum 8 chars in length")]
        public required string Password { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address")]
        public required string Email { get; set; }
    }
}
