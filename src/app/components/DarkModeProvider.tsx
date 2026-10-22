'use client';

import {createContext, ReactNode, useContext, useEffect, useMemo, useSyncExternalStore} from 'react';

type Theme = 'light' | 'dark';

interface DarkModeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isDark: boolean;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);
const themeListeners = new Set<() => void>();

function subscribeToTheme(listener: () => void) {
    themeListeners.add(listener);
    return () => themeListeners.delete(listener);
}

function getThemeSnapshot(): Theme {
    if (typeof window === 'undefined') {
        return 'light';
    }

    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
}

function getServerThemeSnapshot(): Theme {
    return 'light';
}

export function DarkModeProvider({children}: { readonly children: ReactNode }) {
    const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
    const isDark = theme === 'dark';

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    const handleSetTheme = (newTheme: Theme) => {
        localStorage.setItem('theme', newTheme);
        themeListeners.forEach((listener) => listener());
    };

    const value = useMemo(() => ({theme, setTheme: handleSetTheme, isDark}), [theme, isDark]);

    return (
        <DarkModeContext.Provider value={value}>
            {children}
        </DarkModeContext.Provider>
    );
}

export function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
}
