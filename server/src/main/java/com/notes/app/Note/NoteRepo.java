package com.notes.app.Note;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface NoteRepo extends JpaRepository<NoteEntity, Long> {
  List<NoteEntity> findAllByUser_Id(Long userId);

  @Transactional
  boolean existsByNoteIdAndUser_Id(Long noteId, Long userId);

  @Transactional
  void deleteByNoteIdAndUser_Id(Long noteId, Long userId);

}
