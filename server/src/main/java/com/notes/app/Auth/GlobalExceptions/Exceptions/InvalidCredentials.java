package com.notes.app.Auth.GlobalExceptions.Exceptions;

public class InvalidCredentials extends RuntimeException {
  public InvalidCredentials(String message) {
    super(message);
  }

}
