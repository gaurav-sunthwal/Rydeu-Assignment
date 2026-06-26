import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Rounded } from '../../constants/theme';

interface IconWrapperProps {
  children: React.ReactNode;
  size?: number;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  size = 40,
  backgroundColor,
  style,
}) => {
  // Light primary/secondary tint background if not provided
  const defaultBgColor = backgroundColor || '#FFEBF0'; // Light pink tint

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: Rounded.full,
          backgroundColor: defaultBgColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
