package com.notes.app.Auth.GlobalExceptions;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.notes.app.Auth.GlobalExceptions.Exceptions.EmailAlreadyExistsException;
import com.notes.app.Auth.GlobalExceptions.Exceptions.InvalidCredentials;

@RestControllerAdvice
public class GlobalExceptionsConfig {
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Object> LeftBlankExceptionHandler(MethodArgumentNotValidException e) {
    Map<String, List<String>> errors = new HashMap<>();

    e.getBindingResult().getFieldErrors().forEach(error -> {
      errors.computeIfAbsent(error.getField(), _ -> new ArrayList<>())
          .add(error.getDefaultMessage());
    });

    return ResponseEntity.badRequest().body(Map.of(
        "success", false,
        "message", errors));
  }

  @ExceptionHandler(EmailAlreadyExistsException.class)
  public ResponseEntity<Object> emailAlreadyExistsException(EmailAlreadyExistsException e) {
    return ResponseEntity.badRequest().body(Map.of(
        "success", false,
        "data", "",
        "message", Map.of(
            "email", List.of(e.getMessage()))));
  }

  @ExceptionHandler(InvalidCredentials.class)
  public ResponseEntity<Object> invalidCredentials(InvalidCredentials e) {
    return ResponseEntity.badRequest().body(Map.of(
        "success", false,
        "data", "",
        "message", e.getMessage()));
  }

}
