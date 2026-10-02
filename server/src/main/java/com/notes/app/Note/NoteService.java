package com.notes.app.Note;

import org.springframework.stereotype.Service;

import com.notes.app.Auth.GlobalExceptions.Exceptions.NoteNotFoundException;
import com.notes.app.Auth.User.UserEntity;

import java.util.List;

@Service
public class NoteService {

  private final NoteRepo noteRepo;

  public NoteService(NoteRepo noteRepo) {
    this.noteRepo = noteRepo;
  }

  public NoteResponse createNote(CreateNoteRequest request, UserEntity currentUser) {
    NoteEntity note = new NoteEntity();

    note.setTitle(request.getTitle());
    note.setContent(request.getContent());
    note.setUser(currentUser);

    NoteEntity savedNote = noteRepo.save(note);

    return new NoteResponse(savedNote.getNoteId());
  }

  public List<GetNoteResponse> getUserNotes(UserEntity user) {
    return noteRepo
        .findAllByUser_Id(user.getId())
        .stream()
        .map(note -> new GetNoteResponse(
            note.getNoteId(),
            note.getTitle(),
            note.getContent()))
        .toList();
  }

  public void deleteUserNote(Long noteId, UserEntity user) {
    boolean exists = noteRepo.existsByNoteIdAndUser_Id(noteId, user.getId());

    if (!exists) {
      throw new NoteNotFoundException("Note not found or unauthorized to delete");
    }

    noteRepo.deleteByNoteIdAndUser_Id(noteId, user.getId());

  }

}
