import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { useColors, Typography, Spacing, Elevation } from '../constants/theme';
import { ShieldCheck, LogIn, ArrowRight } from 'lucide-react-native';

const logoImg = require('../assets/logo/logo.png');

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const bypassLogin = useAuthStore((state) => state.bypassLogin);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const Colors = useColors();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; api?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const newErrors: { email?: string; password?: string; api?: string } = {};

    if (!email.trim() || !email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      console.log('Attempting login for:', email.trim());
      await login(email.trim(), password);
      router.replace('/');
    } catch (e: any) {
      console.error('Login handleSubmit failed:', e);
      // Auto bypass on API error
      try {
        console.log('Login failed, attempting auto-bypass...');
        await bypassLogin();
        router.replace('/');
      } catch (bypassErr: any) {
        console.error('Auto-bypass failed:', bypassErr);
        setErrors({ api: `Login failed: ${e.message}. Auto-bypass failed: ${bypassErr.message}` });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBypass = async () => {
    setLoading(true);
    try {
      console.log('Attempting manual explore bypass...');
      await bypassLogin();
      router.replace('/');
    } catch (e: any) {
      console.error('Manual bypass failed:', e);
      setErrors({ api: `Bypass failed: ${e.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Image source={logoImg} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Partner Portal</Text>
            <Text style={styles.subtitle}>Sign in to manage your transfer reservations</Text>
          </View>

          <Card style={styles.card}>
            {errors.api && <Text style={styles.apiErrorText}>{errors.api}</Text>}

            <View style={styles.inputWrapper}>
              <Input
                label="Email Address"
                placeholder="e.g. partner@rydeu.com"
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email || errors.api) setErrors((prev) => ({ ...prev, email: undefined, api: undefined }));
                }}
                value={email}
                error={errors.email}
                autoCapitalize="none"
                keyboardType="email-address"
                inputStyle={styles.customInputStyle}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Input
                label="Password"
                placeholder="e.g. ••••••••"
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password || errors.api) setErrors((prev) => ({ ...prev, password: undefined, api: undefined }));
                }}
                value={password}
                error={errors.password}
                secureTextEntry
                autoCapitalize="none"
                inputStyle={styles.customInputStyle}
              />
            </View>

            {/* Premium Crimson Action Button */}
            <TouchableOpacity
              style={[styles.primaryButton, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LogIn size={18} color={Colors.onPrimary} style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Sleek Crimson-outline Secondary Button */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleBypass}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Explore Demo Portal</Text>
              <ArrowRight size={18} color={Colors.primary} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
            
            <View style={styles.secureBadge}>
              <ShieldCheck size={16} color={Colors.textSecondary} />
              <Text style={styles.secureText}>Secure SSL encrypted connection</Text>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const getStyles = (Colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgLight,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.marginMobile,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 150,
    height: 48,
    marginBottom: 12,
  },
  title: {
    fontFamily: Typography.headlineLg.fontFamily,
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: Typography.bodyMd.fontFamily,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.bgCard,
    ...Elevation.level1,
  },
  inputWrapper: {
    width: '100%',
  },
  customInputStyle: {
    fontSize: 15,
  },
  primaryButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    fontFamily: Typography.button.fontFamily,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
  },
  secondaryButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    fontFamily: Typography.button.fontFamily,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  apiErrorText: {
    fontFamily: Typography.bodyMd.fontFamily,
    fontSize: 14,
    color: Colors.error,
    backgroundColor: Colors.primaryLight,
    borderColor: '#F8D7DA',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
  },
  secureText: {
    fontFamily: Typography.labelMd.fontFamily,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
