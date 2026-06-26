import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useColors, Rounded, Elevation, Spacing } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  const Colors = useColors();
  const styles = useMemo(() => getStyles(Colors), [Colors]);
  
  return <View style={[styles.card, style]}>{children}</View>;
};

const getStyles = (Colors: any) => StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard, // Using dynamic card background
    borderRadius: Rounded.md, // 12px
    padding: Spacing.gutter, // 16px
    ...Elevation.level1, // Soft Drop Shadow
  },
});
