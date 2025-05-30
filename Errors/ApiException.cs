﻿namespace DatingApp.Errors;

public class ApiException(int statusCode, string message, string? details)
{
 public int StatusCode { get; } = statusCode;   
 public string Message { get; } = message;
 public string? Details { get; set; } = details;
}