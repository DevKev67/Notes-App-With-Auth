package com.notes.app.Note;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

  @PostMapping("/create")
  public ResponseEntity<Map<String, Object>> createNote(@Valid @RequestBody CreateNoteRequest request,
      @AuthenticationPrincipal UserEntity currentUser) {
    NoteResponse response = noteService.createNote(request, currentUser);

    return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
        "success", true,
        "response", response));

  }

  @GetMapping()
  public ResponseEntity<Map<String, Object>> getAllUserNotes(
      @AuthenticationPrincipal UserEntity user) {

    List<GetNoteResponse> userNotes = noteService.getUserNotes(user);

    return ResponseEntity.ok().body(Map.of(
        "success", true,
        "userNotes", userNotes));

  }

  @DeleteMapping("/delete")
  public ResponseEntity<Map<String, Object>> deleteUserNote(@RequestBody DeleteRequest deleteRequest,
      @AuthenticationPrincipal UserEntity user) {
    noteService.deleteUserNote(deleteRequest.getNoteId(), user);

    return ResponseEntity.ok().body(
        Map.of(
            "success", true,
            "message", "Note Deleted Successfully"));

  }

  @GetMapping("/getOneNote/{noteId}")
  public ResponseEntity<Map<String, Object>> getOneUserNote(@PathVariable Long noteId,
      @AuthenticationPrincipal UserEntity user) {
    GetNoteResponse response = noteService.returnOneUserNote(noteId, user);

    return ResponseEntity.ok().body(
        Map.of(
            "success", true,
            "response", response));
  }

  @PatchMapping("/updateNote/{noteId}")
  public ResponseEntity<Map<String, Object>> updateUserNote(@PathVariable Long noteId,
      @RequestBody PatchRequest patchRequest,
      @AuthenticationPrincipal UserEntity userEntity) {
    noteService.updateUserNote(noteId, userEntity, patchRequest);

    return ResponseEntity.ok().body(Map.of("success", true));
  }

  @GetMapping("/search")
  ResponseEntity<Map<String, Object>> getFilteredNotes(@RequestParam(name = "identifier") String identifier,
      @AuthenticationPrincipal UserEntity userEntity) {

    List<GetNoteResponse> notes = noteService.findNotesViaFilter(userEntity, identifier);

    return ResponseEntity.ok().body(Map.of("success", true,
        "userNotes", notes));

  }

}
