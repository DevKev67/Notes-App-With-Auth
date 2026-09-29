import { useNavigate } from "react-router-dom";
import { useKeyboardShortcut } from "../CustomHooks/useKeyboardShortcut";

export function AppShortcuts() {
  const navigate = useNavigate();

  useKeyboardShortcut("s", "ctrl", () => navigate("/settings"));
  useKeyboardShortcut("c", "ctrl", () => navigate("/create/new"));
  useKeyboardShortcut("h", "ctrl", () => navigate("/"));

  return null;
}
