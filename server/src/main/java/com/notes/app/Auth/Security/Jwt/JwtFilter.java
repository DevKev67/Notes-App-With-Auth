package com.notes.app.Auth.Security.Jwt;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
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

    } catch (Exception e) {

    }

    filterChain.doFilter(request, response);

  }

}
