package com.notes.app.Auth.Dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class SignUpResponse {
  private String email;
  private String name;
  private LocalDateTime created_at;

}
