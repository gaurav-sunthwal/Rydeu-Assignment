import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { useColors, Typography, Rounded } from '../../constants/theme';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  onFocus,
  onBlur,
  secureTextEntry,
  ...props
}) => {
  const Colors = useColors();
  const styles = useMemo(() => getStyles(Colors), [Colors]);
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const isPasswordInput = secureTextEntry !== undefined;
  const shouldHideText = isPasswordInput && !passwordVisible;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error ? styles.inputError : null,
            isPasswordInput && styles.inputPasswordPadding,
            inputStyle,
          ]}
          placeholderTextColor={Colors.tertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={shouldHideText}
          {...props}
        />
        {isPasswordInput && (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setPasswordVisible(!passwordVisible)}
            activeOpacity={0.7}
          >
            {passwordVisible ? (
              <EyeOff size={20} color={Colors.tertiary} />
            ) : (
              <Eye size={20} color={Colors.tertiary} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
    </View>
  );
};

const getStyles = (Colors: any) => StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontFamily: Typography.labelMd.fontFamily,
    fontSize: Typography.labelMd.fontSize,
    fontWeight: Typography.labelMd.fontWeight,
    color: Colors.onBackground,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.borderLight, // Dynamic border
    borderRadius: Rounded.default, // 8px
    paddingHorizontal: 16,
    color: Colors.onBackground,
    backgroundColor: Colors.surfaceContainerLowest, // Dynamic background
    fontFamily: Typography.bodyLg.fontFamily,
    fontSize: Typography.bodyLg.fontSize,
    width: '100%',
  },
  inputFocused: {
    borderColor: Colors.primary, // Dynamic focus color
  },
  inputError: {
    borderColor: Colors.error,
  },
  inputPasswordPadding: {
    paddingRight: 48, // Make space for the eye icon
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: Typography.bodyMd.fontFamily,
    fontSize: Typography.bodyMd.fontSize,
    color: Colors.error,
    marginTop: 4,
  },
});
