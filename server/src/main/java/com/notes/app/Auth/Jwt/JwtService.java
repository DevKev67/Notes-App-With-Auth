package com.notes.app.Auth.Jwt;

import java.time.Duration;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.notes.app.Auth.User.UserEntity;

@Service
public class JwtService {
  private final Algorithm algorithm;

  public JwtService(@Value("${jwt.key}") String secret) {
    this.algorithm = Algorithm.HMAC256(secret);
  }

  public String createToken(UserEntity userEntity) {
    long currentTime = System.currentTimeMillis();
    long expirationtime = currentTime + Duration.ofHours(3).toMillis();

    return JWT.create()
        .withSubject(userEntity.getId().toString())
        .withIssuedAt(new Date(currentTime))
        .withExpiresAt(new Date(expirationtime))
        .sign(algorithm);
  }

  public String extractSubject(String token) {
    return JWT.require(algorithm)
        .build()
        .verify(token)
        .getSubject();
  }

  public Date extractExpiration(String token) {
    return JWT.require(algorithm)
        .build()
        .verify(token)
        .getExpiresAt();
  }

}
