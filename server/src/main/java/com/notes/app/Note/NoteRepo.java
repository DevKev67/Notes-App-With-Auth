package com.notes.app.Note;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepo extends JpaRepository<NoteEntity, Long> {
  List<NoteEntity> findAllByUser_Id(Long userId);

  boolean existsByNoteIdAndUser_Id(Long noteId, Long userId);

  @Transactional
  void deleteByNoteIdAndUser_Id(Long noteId, Long userId);

  Optional<NoteEntity> findByNoteIdAndUser_Id(Long noteId, Long userId);

  List<NoteEntity> findByUser_IdAndTitleContainingIgnoreCaseOrUser_IdAndContentContainingIgnoreCase(
      Long titleUserId,
      String titleQuery,
      Long contentUserId,
      String contentQuery);

}
