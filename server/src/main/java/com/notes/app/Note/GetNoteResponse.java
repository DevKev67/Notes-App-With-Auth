package com.notes.app.Note;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetNoteResponse {
  private Long noteId;
  private String title;
  private String context;
}
