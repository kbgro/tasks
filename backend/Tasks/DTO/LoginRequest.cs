using System.ComponentModel.DataAnnotations;

namespace Tasks.DTO
{
    public class LoginRequest
    {
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^/&*-]).{8,}$", 
            ErrorMessage = "Password must be at least one upper case, at least one lower case, at least one digit, at least one special character and a minimum 8 chars in length")]
        public required string Password { get; set; }

    }
}
