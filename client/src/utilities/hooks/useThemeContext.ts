import { useContext } from "react";
import { ThemeConsumerProp, ThemeContext } from "../context/ThemeContext";

export const useThemeContext = () => {
    const context = useContext<ThemeConsumerProp>(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext error.');
    }
    
    return context;
}