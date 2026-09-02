package com.notes.app.Note;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NoteResponse {
  private Long noteId;
  private String title;
  private String content;
}
