import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the types
export type Theme = 'light' | 'dark';
export type Currency = string; // Add more currencies as needed

interface AppSettings {
  theme: Theme;
  currency: Currency;
}

interface ThemeContextType extends AppSettings {
  toggleTheme: () => void;
  setCurrency: (currency: Currency) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// AsyncStorage keys
const SETTINGS_KEY = '@app_settings';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'dark',
    currency: 'United States Dollar',
  });

  // Load settings from AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  // Save settings to AsyncStorage whenever they change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    };
    saveSettings();
  }, [settings]);

  const toggleTheme = useCallback(() => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      theme: prevSettings.theme === 'light' ? 'dark' : 'light',
    }));
  }, []);

  const setCurrency = useCallback((currency: Currency) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      currency,
    }));
  }, []);

  return (
    <ThemeContext.Provider value={{ ...settings, toggleTheme, setCurrency }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
