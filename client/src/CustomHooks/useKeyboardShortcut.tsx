import { useEffect } from "react";

export function useKeyboardShortcut(
  targetKey: string,
  modifier: string,
  callback: (...args: unknown[]) => unknown,
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the primary key matches
      const isKeyMatch = event.key.toLowerCase() === targetKey.toLowerCase();

      // Map modifier keys (e.g., 'ctrl', 'meta/cmd', 'shift', 'alt')
      const isModifierMatch =
        (modifier === "ctrl" && event.ctrlKey) ||
        (modifier === "cmd" && event.metaKey) ||
        (modifier === "shift" && event.shiftKey) ||
        (modifier === "alt" && event.altKey) ||
        !modifier; // No modifier requested

      // Prevent shortcuts from triggering if the user is typing in an input/textarea

      let isTyping;
      if (document.activeElement !== null) {
        isTyping = ["INPUT", "TEXTAREA"].includes(
          document.activeElement.tagName,
        );
      }

      if (isKeyMatch && isModifierMatch && !isTyping) {
        event.preventDefault(); // Stop default browser actions (e.g., Ctrl+S saving the page)
        callback();
      }
    };

    // Attach event listener to the global window object
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the listener when the component unmounts
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [targetKey, modifier, callback]);
}
