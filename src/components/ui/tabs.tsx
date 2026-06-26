import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography } from '../../constants/theme';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  containerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  containerStyle,
  tabStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.8}
            onPress={() => onTabChange(tab.id)}
            style={[styles.tab, isActive && styles.tabActive, tabStyle]}
          >
            <Text style={[styles.tabText, isActive ? styles.tabTextActive : styles.tabTextInactive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // Neutral dividing line
    width: '100%',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    borderBottomColor: Colors.primaryPink, // Vibrant Pink active underline
  },
  tabText: {
    fontFamily: Typography.button.fontFamily,
    fontSize: Typography.button.fontSize,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.primaryPink, // Vibrant Pink
  },
  tabTextInactive: {
    color: Colors.tertiary, // Muted grey
  },
});
