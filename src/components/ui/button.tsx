import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography, Rounded } from '../../constants/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  labelStyle,
}) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? Colors.onPrimary : Colors.primaryPink} />
      ) : (
        <Text
          style={[
            styles.text,
            isPrimary ? styles.textPrimary : styles.textSecondary,
            disabled && styles.textDisabled,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: Rounded.default, // 8px
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  primary: {
    backgroundColor: Colors.primaryPink, // Vibrant Pink (#FF2D55)
  },
  secondary: {
    backgroundColor: Colors.surfaceContainerLowest, // White #ffffff
    borderWidth: 1,
    borderColor: '#E5E7EB', // Neutral border
  },
  disabled: {
    backgroundColor: Colors.surfaceContainerHigh,
    borderColor: 'transparent',
  },
  text: {
    fontFamily: Typography.button.fontFamily,
    fontSize: Typography.button.fontSize,
    fontWeight: Typography.button.fontWeight,
    lineHeight: Typography.button.lineHeight,
  },
  textPrimary: {
    color: Colors.onPrimary,
  },
  textSecondary: {
    color: Colors.secondary, // Deep Blue/Black #406182 or #191c1d
  },
  textDisabled: {
    color: Colors.tertiary,
  },
});
