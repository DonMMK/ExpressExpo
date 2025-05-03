import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { colors } from '@/constants/colors';

// Theme types
interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
}

interface ThemeType {
  dark: boolean;
  colors: ThemeColors;
}

// Context types
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

// Define light and dark themes
const lightTheme: ThemeType = {
  dark: false,
  colors: {
    background: colors.background,
    card: colors.card,
    text: colors.text,
    textSecondary: colors.textSecondary,
    textTertiary: colors.textTertiary,
    border: colors.border,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
  },
};

const darkTheme: ThemeType = {
  dark: true,
  colors: {
    background: colors.backgroundDark,
    card: colors.cardDark,
    text: colors.textDark,
    textSecondary: colors.textSecondaryDark,
    textTertiary: colors.textTertiaryDark,
    border: colors.borderDark,
    primary: colors.primary, // Keep primary the same for brand consistency
    secondary: colors.secondary,
    accent: colors.accent,
  },
};

// Create context
const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => {},
  setTheme: () => {},
});

// Create provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get device color scheme
  const deviceTheme = useColorScheme();
  const [themeState, setThemeState] = useState<ThemeType>(
    deviceTheme === 'dark' ? darkTheme : lightTheme,
  );
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Load theme preference from storage on mount
  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await SecureStore.getItemAsync('theme-preference');
        if (savedTheme) {
          setThemeState(savedTheme === 'dark' ? darkTheme : lightTheme);
        } else {
          // Use device theme as default if no saved preference
          setThemeState(deviceTheme === 'dark' ? darkTheme : lightTheme);
        }
        setIsThemeLoaded(true);
      } catch (error) {
        console.error('Error loading theme preference:', error);
        // Fallback to device theme
        setThemeState(deviceTheme === 'dark' ? darkTheme : lightTheme);
        setIsThemeLoaded(true);
      }
    }

    loadTheme();
  }, [deviceTheme]);

  // Save theme preference when it changes
  const saveTheme = async (isDark: boolean) => {
    try {
      await SecureStore.setItemAsync(
        'theme-preference',
        isDark ? 'dark' : 'light',
      );
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setThemeState((prevTheme) => {
      const newTheme = prevTheme.dark ? lightTheme : darkTheme;
      saveTheme(newTheme.dark);
      return newTheme;
    });
  };

  // Set theme explicitly
  const setTheme = (isDark: boolean) => {
    setThemeState(isDark ? darkTheme : lightTheme);
    saveTheme(isDark);
  };

  // Use device theme changes if no explicit user preference
  useEffect(() => {
    if (isThemeLoaded && deviceTheme) {
      // Only apply device theme if user hasn't explicitly set a theme
      const hasUserPreference = SecureStore.getItemAsync(
        'theme-preference',
      ).then((pref) => !!pref);

      if (!hasUserPreference) {
        setThemeState(deviceTheme === 'dark' ? darkTheme : lightTheme);
      }
    }
  }, [deviceTheme, isThemeLoaded]);

  return (
    <ThemeContext.Provider value={{ theme: themeState, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
