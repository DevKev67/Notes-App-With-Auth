package com.notes.app.Note;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class CreateNoteRequest {
  @NotBlank(message = "Title is required")
  @Size(max = 50, message = "Title cannot exceed 50 characters")
  private String title;

  @NotBlank(message = "Content is required")
  private String content;

}
