package com.notes.app.Auth.Dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class ExpirationTimeResponse {
  private long expiration;
  private LocalDateTime created_at;
  private String name;

}
