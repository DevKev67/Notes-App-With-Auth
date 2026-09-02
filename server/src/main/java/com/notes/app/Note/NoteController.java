package com.notes.app.Note;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notes.app.Auth.User.UserEntity;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
  private final NoteService noteService;

  public NoteController(NoteService noteService) {
    this.noteService = noteService;
  }

  @PostMapping
  public ResponseEntity<Map<String, Object>> createNote(@Valid @RequestBody CreateNoteRequest request,
      @AuthenticationPrincipal UserEntity currentUser) {
    NoteResponse response = noteService.createNote(request, currentUser);

    return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
        "success", true,
        "response", response));

  }

}
