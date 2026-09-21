package com.notes.app.Auth.GlobalExceptions.Exceptions;

public class NoteNotFoundException extends RuntimeException {
  public NoteNotFoundException(String message) {
    super(message);
  }

}
