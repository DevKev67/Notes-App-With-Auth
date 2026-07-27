package com.notes.app.Auth.GlobalExceptions.Exceptions;

public class EmailAlreadyExistsException extends RuntimeException {
  public EmailAlreadyExistsException(String message) {
    super(message);
  }

}
