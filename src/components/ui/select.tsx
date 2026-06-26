import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography, Rounded } from '../../constants/theme';
import { ChevronDown } from 'lucide-react-native';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  containerStyle?: ViewStyle;
  triggerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onValueChange,
  placeholder = 'Select option...',
  error,
  containerStyle,
  triggerStyle,
  labelStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val: string) => {
    onValueChange(val);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        style={[
          styles.trigger,
          modalVisible && styles.triggerActive,
          error ? styles.triggerError : null,
          triggerStyle,
        ]}
      >
        <Text style={[styles.triggerText, !selectedOption && styles.placeholderText]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <ChevronDown size={20} color={Colors.secondary} />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label || 'Select'}</Text>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    item.value === value && styles.optionItemActive,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  trigger: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: Rounded.default,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceContainerLowest,
  },
  triggerActive: {
    borderColor: Colors.primaryPink,
  },
  triggerError: {
    borderColor: Colors.error,
  },
  triggerText: {
    fontFamily: Typography.bodyLg.fontFamily,
    fontSize: Typography.bodyLg.fontSize,
    color: Colors.onBackground,
  },
  placeholderText: {
    color: Colors.tertiary,
  },
  errorText: {
    fontFamily: Typography.bodyMd.fontFamily,
    fontSize: Typography.bodyMd.fontSize,
    color: Colors.error,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopLeftRadius: Rounded.lg,
    borderTopRightRadius: Rounded.lg,
    maxHeight: '50%',
    paddingBottom: 24,
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: Typography.headlineMd.fontFamily,
    fontSize: Typography.headlineMd.fontSize,
    fontWeight: Typography.headlineMd.fontWeight,
    color: Colors.onBackground,
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionItemActive: {
    backgroundColor: '#FFEBF0', // Light primary pink tint
  },
  optionText: {
    fontFamily: Typography.bodyLg.fontFamily,
    fontSize: Typography.bodyLg.fontSize,
    color: Colors.onBackground,
  },
  optionTextActive: {
    color: Colors.primaryPink,
    fontWeight: '600',
  },
});
