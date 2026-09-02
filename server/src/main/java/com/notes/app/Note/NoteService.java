package com.notes.app.Note;

import org.springframework.stereotype.Service;

import com.notes.app.Auth.User.UserEntity;

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

    return new NoteResponse(
        savedNote.getNoteId(),
        savedNote.getTitle(),
        savedNote.getContent());
  }

}
