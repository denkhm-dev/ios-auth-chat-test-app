// Modern color palette inspired by iOS and Material Design
export const Colors = {
  // Primary colors
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3', // Main primary
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },
  
  // Secondary colors (Purple)
  secondary: {
    50: '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0', // Main secondary
    600: '#8E24AA',
    700: '#7B1FA2',
    800: '#6A1B9A',
    900: '#4A148C',
  },
  
  // Accent colors (Teal)
  accent: {
    50: '#E0F2F1',
    100: '#B2DFDB',
    200: '#80CBC4',
    300: '#4DB6AC',
    400: '#26A69A',
    500: '#009688', // Main accent
    600: '#00897B',
    700: '#00796B',
    800: '#00695C',
    900: '#004D40',
  },
  
  // Neutral colors
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Semantic colors
  success: {
    50: '#E8F5E8',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },
  
  warning: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#FFC107',
    600: '#FFB300',
    700: '#FFA000',
    800: '#FF8F00',
    900: '#FF6F00',
  },
  
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336',
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },
  
  // Background colors
  background: {
    light: '#FFFFFF',
    dark: '#121212',
    surface: '#F8F9FA',
    surfaceVariant: '#F1F3F4',
  },
  
  // Text colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#212121',
    onBackground: '#212121',
  },
  
  // Chat specific colors
  chat: {
    ownMessage: '#2196F3',
    otherMessage: '#E3F2FD',
    ownMessageText: '#FFFFFF',
    otherMessageText: '#212121',
    timestamp: '#757575',
    inputBackground: '#F5F5F5',
    inputBorder: '#E0E0E0',
    sendButton: '#2196F3',
    sendButtonDisabled: '#BDBDBD',
  },
  
  // Auth specific colors
  auth: {
    background: '#FFFFFF',
    inputBackground: '#F8F9FA',
    inputBorder: '#E0E0E0',
    inputFocus: '#2196F3',
    buttonPrimary: '#2196F3',
    buttonSecondary: '#9C27B0',
    buttonDisabled: '#BDBDBD',
    link: '#2196F3',
    error: '#F44336',
  },
} as const;

// Helper function to get color with opacity
export const withOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Dark mode colors
export const DarkColors = {
  ...Colors,
  background: {
    light: '#121212',
    dark: '#000000',
    surface: '#1E1E1E',
    surfaceVariant: '#2D2D2D',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
    disabled: '#666666',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onSurface: '#FFFFFF',
    onBackground: '#FFFFFF',
  },
  chat: {
    ownMessage: '#2196F3',
    otherMessage: '#2D2D2D',
    ownMessageText: '#FFFFFF',
    otherMessageText: '#FFFFFF',
    timestamp: '#B3B3B3',
    inputBackground: '#2D2D2D',
    inputBorder: '#404040',
    sendButton: '#2196F3',
    sendButtonDisabled: '#666666',
  },
  auth: {
    background: '#121212',
    inputBackground: '#2D2D2D',
    inputBorder: '#404040',
    inputFocus: '#2196F3',
    buttonPrimary: '#2196F3',
    buttonSecondary: '#9C27B0',
    buttonDisabled: '#666666',
    link: '#2196F3',
    error: '#F44336',
  },
} as const;
