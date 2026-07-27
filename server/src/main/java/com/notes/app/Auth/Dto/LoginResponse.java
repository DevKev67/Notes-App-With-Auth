package com.notes.app.Auth.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class LoginResponse {
  private String token;
  private SignUpResponse signUpResponse;

}
