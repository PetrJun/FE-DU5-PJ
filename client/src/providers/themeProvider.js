import React, { createContext, useState, useContext } from 'react';

// Témata pro světelný a tmavý režim
const lightTheme = {
    title: "lightTheme",
    bg: "light",
    bgInv: "dark",
    variant: "light",
    text: "text-black",
    textInv: "text-white",
    background: '#ffffff',
    color: '#000000',
};

const darkTheme = {
    title: "darkTheme",
    bg: "dark",
    bgInv: "light",
    variant: "dark",
    text: "text-white",
    textInv: "text-black",
    background: '#000000',
    color: '#ffffff',
};

// Vytvoření kontextu pro správu tématu
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(lightTheme); // Výchozí téma je světelné

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook pro snadné použití kontextu
export const useTheme = () => useContext(ThemeContext);