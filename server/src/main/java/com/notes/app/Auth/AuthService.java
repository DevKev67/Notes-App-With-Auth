package com.notes.app.Auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.notes.app.Auth.Dto.SignUpRequest;
import com.notes.app.Auth.Dto.SignUpResponse;
import com.notes.app.Auth.GlobalExceptions.Exceptions.EmailAlreadyExistsException;
import com.notes.app.Auth.User.UserEntity;
import com.notes.app.Auth.User.UserRepo;

@Service
public class AuthService {
  private final UserRepo userRepo;
  private final PasswordEncoder passwordEncoder;

  public AuthService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
  }

  private SignUpResponse toSignUpResponse(UserEntity user) {
    return new SignUpResponse(user.getEmail(), user.getName(), user.getCreated_at());
  }

  public SignUpResponse signup(SignUpRequest request) {
    if (userRepo.findByEmail(request.getEmail()).isPresent()) {
      throw new EmailAlreadyExistsException("Email already used");
    }

    String hashedPassword = passwordEncoder.encode(request.getPassword());

    UserEntity user = new UserEntity();

    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPassword(hashedPassword);

    UserEntity savedUser = userRepo.save(user);

    return toSignUpResponse(savedUser);

  }

}
