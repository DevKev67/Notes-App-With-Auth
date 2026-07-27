package com.notes.app.Auth;

import java.time.Duration;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notes.app.Auth.Dto.LoginRequest;
import com.notes.app.Auth.Dto.LoginResponse;
import com.notes.app.Auth.Dto.SignUpRequest;
import com.notes.app.Auth.Dto.SignUpResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/signup")
  public ResponseEntity<Object> signup(@Valid @RequestBody SignUpRequest signUpRequest) {
    SignUpResponse response = authService.signup(signUpRequest);

    return ResponseEntity.ok().body(Map.of(
        "success", true,
        "data", response,
        "message", "Signed In Successfully"));

  }

  @PostMapping("/login")
  public ResponseEntity<Object> login(@Valid @RequestBody LoginRequest request) {
    LoginResponse response = authService.login(request);

    ResponseCookie cookie = ResponseCookie.from("jwt", response.getToken())
        .httpOnly(true)
        .secure(false)
        .path("/")
        .maxAge(Duration.ofSeconds(30))
        .sameSite("Lax")
        .build();

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(Map.of(
            "success", true,
            "message", "Logged In Succesfully",
            "data", response.getSignUpResponse()));

  }

}
