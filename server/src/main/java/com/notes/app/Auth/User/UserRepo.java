package com.notes.app.Auth.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByEmail(String email);

}
