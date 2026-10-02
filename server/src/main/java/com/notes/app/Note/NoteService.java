package com.notes.app.Note;

import org.springframework.stereotype.Service;

import com.notes.app.Auth.GlobalExceptions.Exceptions.NoteNotFoundException;
import com.notes.app.Auth.User.UserEntity;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Objects;

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

  public GetNoteResponse returnOneUserNote(Long noteId, UserEntity userEntity) {
    NoteEntity note = noteRepo.findByNoteIdAndUser_Id(noteId, userEntity.getId())
        .orElseThrow(() -> new NoteNotFoundException("Note does not exist or Note Id missing"));

    return new GetNoteResponse(note.getNoteId(), note.getTitle(), note.getContent());
  }

  @Transactional
  public void updateUserNote(Long noteId, UserEntity userEntity, PatchRequest patchRequest) {
    NoteEntity note = noteRepo.findByNoteIdAndUser_Id(noteId, userEntity.getId())
        .orElseThrow(() -> new NoteNotFoundException("Note does not exist or Note Id missing"));

    if (patchRequest.getTitle() != null && !Objects.equals(note.getTitle(), patchRequest.getTitle())) {
      note.setTitle(patchRequest.getTitle());
    }

    if (patchRequest.getContent() != null && !Objects.equals(note.getContent(), patchRequest.getContent())) {
      note.setContent(patchRequest.getContent());
    }
  }

}
