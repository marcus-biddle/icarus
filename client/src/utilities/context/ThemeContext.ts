/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

export interface ThemeConsumerProp { 
    theme: string, 
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeConsumerProp>({
    theme: '',
    toggleTheme: () => null
});