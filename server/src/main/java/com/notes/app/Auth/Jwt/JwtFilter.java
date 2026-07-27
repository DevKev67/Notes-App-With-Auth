package com.notes.app.Auth.Jwt;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.notes.app.Auth.User.UserEntity;
import com.notes.app.Auth.User.UserRepo;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
  private final JwtService jwtService;
  private final UserRepo userRepo;

  public JwtFilter(JwtService jwtService, UserRepo userRepo) {
    this.jwtService = jwtService;
    this.userRepo = userRepo;
  }

  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    Cookie[] cookies = request.getCookies();

    if (cookies == null) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = null;

    for (Cookie cookie : cookies) {
      if (cookie.getName().equals("jwt")) {
        token = cookie.getValue();
        break;
      }
    }

    if (token == null) {
      filterChain.doFilter(request, response);
      return;
    }

    try {
      String subject = jwtService.extractSubject(token);
      Long id = Long.valueOf(subject);

      Optional<UserEntity> possibleUser = userRepo.findById(id);

      if (possibleUser.isEmpty()) {
        SecurityContextHolder.clearContext();
        filterChain.doFilter(request, response);
        return;
      }

      UserEntity user = possibleUser.get();

      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null,
          List.of());

      SecurityContextHolder.getContext().setAuthentication(authenticationToken);

    } catch (JWTVerificationException | NumberFormatException e) {
      SecurityContextHolder.clearContext();
    }

    filterChain.doFilter(request, response);

  }

}
