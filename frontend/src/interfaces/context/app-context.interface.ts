import type { ThemeMode } from "../../types/theme/theme-mode.type";

export interface IAppContext {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}
