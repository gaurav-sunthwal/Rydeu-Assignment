export const Colors = {
  // Brand / Primary
  primary: '#ba0034',         // Brand Crimson
  primaryLight: '#FAF0F2',    // Light pink tint
  primaryBorder: '#F4D1D9',   // Pinkish border
  primaryPink: '#ff2d55',     // Original Pink
  onPrimary: '#ffffff',
  primaryContainer: '#e51245',
  onPrimaryContainer: '#fffbff',
  inversePrimary: '#ffb3b5',

  // Secondary
  secondary: '#406182',
  onSecondary: '#ffffff',
  secondaryContainer: '#b6d8fe',
  onSecondaryContainer: '#3d5e7f',

  // Tertiary
  tertiary: '#555c6a',
  onTertiary: '#ffffff',
  tertiaryContainer: '#6e7583',
  onTertiaryContainer: '#fefcff',

  // Custom Brand Colors
  textPrimary: '#1A1A1A',
  textSecondary: '#8A8A8A',
  bgLight: '#F8F9FA',
  bgCard: '#FFFFFF',
  bgInput: '#F3F4F6',
  borderLight: '#EFEFEF',

  // Neutrals / Surface
  background: '#f8f9fa',
  onBackground: '#191c1d',
  surface: '#f8f9fa',
  surfaceDim: '#d9dadb',
  surfaceBright: '#f8f9fa',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainer: '#edeeef',
  surfaceContainerHigh: '#e7e8e9',
  surfaceContainerHighest: '#e1e3e4',
  onSurface: '#191c1d',
  onSurfaceVariant: '#5d3f40',
  inverseSurface: '#2e3132',
  inverseOnSurface: '#f0f1f2',
  outline: '#916e6f',
  outlineVariant: '#e6bcbd',
  surfaceVariant: '#e1e3e4',
  surfaceTint: '#be0036',

  // Error
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  // Fixed roles
  primaryFixed: '#ffdada',
  primaryFixedDim: '#ffb3b5',
  onPrimaryFixed: '#40000c',
  onPrimaryFixedVariant: '#920027',
  secondaryFixed: '#cfe5ff',
  secondaryFixedDim: '#a8caef',
  onSecondaryFixed: '#001d34',
  onSecondaryFixedVariant: '#274969',
  tertiaryFixed: '#dce2f3',
  tertiaryFixedDim: '#c0c7d6',
  onTertiaryFixed: '#151c27',
  onTertiaryFixedVariant: '#404754',
};

export const DarkColors = {
  // Brand / Primary
  primary: '#ff4d6d',         // Brighter Brand Crimson for dark mode contrast
  primaryLight: '#2b0d14',    // Dark pink tint
  primaryBorder: '#5e1d28',   // Dark pinkish border
  primaryPink: '#ff4d6d',
  onPrimary: '#ffffff',
  primaryContainer: '#ba0034',
  onPrimaryContainer: '#fffbff',
  inversePrimary: '#ffb3b5',

  // Secondary
  secondary: '#a8caef',
  onSecondary: '#0e1d2e',
  secondaryContainer: '#274969',
  onSecondaryContainer: '#cfe5ff',

  // Tertiary
  tertiary: '#c0c7d6',
  onTertiary: '#151c27',
  tertiaryContainer: '#404754',
  onTertiaryContainer: '#dce2f3',

  // Custom Brand Colors
  textPrimary: '#ffffff',
  textSecondary: '#a0a0a0',
  bgLight: '#121212',
  bgCard: '#1E1E1E',
  bgInput: '#2C2C2C',
  borderLight: '#2C2C2C',

  // Neutrals / Surface
  background: '#121212',
  onBackground: '#f0f1f2',
  surface: '#1e1e1e',
  surfaceDim: '#151515',
  surfaceBright: '#2a2a2a',
  surfaceContainerLowest: '#0f0f0f',
  surfaceContainerLow: '#1a1a1a',
  surfaceContainer: '#222222',
  surfaceContainerHigh: '#2d2d2d',
  surfaceContainerHighest: '#383838',
  onSurface: '#f0f1f2',
  onSurfaceVariant: '#e6bcbd',
  inverseSurface: '#f8f9fa',
  inverseOnSurface: '#191c1d',
  outline: '#e6bcbd',
  outlineVariant: '#916e6f',
  surfaceVariant: '#2c2c2c',
  surfaceTint: '#ff4d6d',

  // Error
  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',
  onErrorContainer: '#ffdad6',

  // Fixed roles
  primaryFixed: '#40000c',
  primaryFixedDim: '#920027',
  onPrimaryFixed: '#ffdada',
  onPrimaryFixedVariant: '#ffb3b5',
  secondaryFixed: '#001d34',
  secondaryFixedDim: '#274969',
  onSecondaryFixed: '#cfe5ff',
  onSecondaryFixedVariant: '#a8caef',
  tertiaryFixed: '#151c27',
  tertiaryFixedDim: '#404754',
  onTertiaryFixed: '#dce2f3',
  onTertiaryFixedVariant: '#c0c7d6',
};

import { useThemeStore } from '../store/themeStore';

export const useColors = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return isDarkMode ? DarkColors : Colors;
};

export const Typography = {
  headlineLg: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.56, // -0.02em of 28px
  },
  headlineLgMobile: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  headlineMd: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  bodyLg: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMd: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  labelMd: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 16,
    letterSpacing: 0.6, // 0.05em of 12px
  },
  button: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    fontWeight: '700' as const,
    lineHeight: 24,
  },
};

export const Rounded = {
  sm: 4, // 0.25rem * 16px
  default: 8, // 0.5rem * 16px
  md: 12, // 0.75rem * 16px
  lg: 16, // 1rem * 16px
  xl: 24, // 1.5rem * 16px
  full: 9999,
};

export const Spacing = {
  containerMax: 1200,
  gutter: 16,
  marginMobile: 16,
  marginDesktop: 32,
  stackSm: 8,
  stackMd: 16,
  stackLg: 32,
  
  // Base-8 increments
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
};

export const Elevation = {
  level1: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4, // for android
  },
};
