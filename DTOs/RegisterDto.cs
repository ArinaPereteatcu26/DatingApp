﻿using System.ComponentModel.DataAnnotations;

namespace DatingApp.DTOs;

public class RegisterDto
{
    [Required]
    [MaxLength(50)]
    public string Username { get; set; } = string.Empty;
    
    [Required]
    [StringLength(8, MinimumLength = 4)]
    public string Password { get; set; } =string.Empty;
}