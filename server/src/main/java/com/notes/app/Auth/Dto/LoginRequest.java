package com.notes.app.Auth.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class LoginRequest {
  @NotBlank(message = "Email Required")
  @Email(message = "Email must be valid")
  private String email;

  @NotBlank(message = "Password Required")
  private String password;

}
