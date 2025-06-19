import type { ThemeMode } from './app-reducer';
import type { RootState } from '../app/store';

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
