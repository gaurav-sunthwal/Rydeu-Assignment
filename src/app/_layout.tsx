import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, useColorScheme } from 'react-native';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { Colors } from '../constants/theme';

export default function RootLayout() {
  const { user, isInitialized, checkAuth } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const systemScheme = useColorScheme();
  const setDarkMode = useThemeStore((state) => state.setDarkMode);

  // Sync system color scheme preference on mount and change
  useEffect(() => {
    if (systemScheme) {
      setDarkMode(systemScheme === 'dark');
    }
  }, [systemScheme]);

  // Initialize auth store on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Protect and redirect routes based on user auth status
  useEffect(() => {
    if (!isInitialized || !navigationState?.key) return;

    const inAuthScreen = segments[0] === 'login';

    console.log('[RootLayout Guard] State:', {
      hasUser: !!user,
      inAuthScreen,
      segments,
      isNavigationReady: !!navigationState?.key
    });

    if (!user && !inAuthScreen) {
      // Redirect to login page if user is not authenticated
      console.log('[RootLayout Guard] Redirecting to /login');
      router.replace('/login');
    } else if (user && inAuthScreen) {
      // Redirect to home if user is authenticated but trying to access login
      console.log('[RootLayout Guard] Redirecting to /');
      router.replace('/');
    }
  }, [user, isInitialized, segments, navigationState?.key]);

  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryPink} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ gestureEnabled: false }} />
      <Stack.Screen name="index" />
      <Stack.Screen name="summary" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});
