package com.notes.app.Note;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepo extends JpaRepository<NoteEntity, Long> {
  List<NoteEntity> findAllByUser_Id(Long userId);

}
