/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import { Theme } from '../types';

const STORAGE_KEY = 'gemini-os-theme';

const lightTheme: Theme = {
  mode: 'light',
  primaryColor: '#3b82f6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
};

const darkTheme: Theme = {
  mode: 'dark',
  primaryColor: '#60a5fa',
  backgroundColor: '#1f2937',
  textColor: '#f9fafb',
};

export const themeService = {
  // Load theme from localStorage
  loadTheme: (): Theme => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
    return lightTheme;
  },

  // Save theme to localStorage
  saveTheme: (theme: Theme): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },

  // Toggle between light and dark mode
  toggleTheme: (currentTheme: Theme): Theme => {
    const newTheme = currentTheme.mode === 'light' ? darkTheme : lightTheme;
    themeService.saveTheme(newTheme);
    themeService.applyTheme(newTheme);
    return newTheme;
  },

  // Apply theme to document
  applyTheme: (theme: Theme): void => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--text-color', theme.textColor);
    
    // Apply theme class to body
    document.body.className = `theme-${theme.mode}`;
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.backgroundColor);
    }
  },

  // Get current theme
  getCurrentTheme: (): Theme => {
    return themeService.loadTheme();
  },

  // Set specific theme
  setTheme: (theme: Theme): void => {
    themeService.saveTheme(theme);
    themeService.applyTheme(theme);
  },

  // Initialize theme on app start
  initialize: (): Theme => {
    const theme = themeService.loadTheme();
    themeService.applyTheme(theme);
    return theme;
  },
}; 