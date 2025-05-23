﻿using System.ComponentModel.DataAnnotations;

namespace DatingApp.DTOs;

public class RegisterDto
{
    [Required]
    [MaxLength(50)]
    public required string Username { get; set; }
    
    [Required]
    public required string Password { get; set; }
}