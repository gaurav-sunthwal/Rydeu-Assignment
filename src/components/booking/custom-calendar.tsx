import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ViewStyle, StyleProp } from 'react-native';
import moment from 'moment';
import { useColors, Typography, Elevation } from '../../constants/theme';
import { ChevronLeft, ChevronRight, ChevronDown, Clock } from 'lucide-react-native';

interface CustomCalendarProps {
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // HH:mm
  onSelect: (date: string, time: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selectedDate,
  selectedTime,
  onSelect,
  style,
}) => {
  const Colors = useColors();
  const styles = useMemo(() => getStyles(Colors), [Colors]);
  // Current month being viewed in calendar (default to selectedDate or today)
  const [currentMonth, setCurrentMonth] = useState(() => {
    return selectedDate ? moment(selectedDate).startOf('month') : moment().startOf('month');
  });

  const [showHourModal, setShowHourModal] = useState(false);
  const [showMinuteModal, setShowMinuteModal] = useState(false);
  const [showAmPmModal, setShowAmPmModal] = useState(false);

  // Parse time
  const [timeHour, timeMinute] = useMemo(() => {
    if (!selectedTime) return ['09', '30'];
    const parts = selectedTime.split(':');
    return [parts[0] || '09', parts[1] || '30'];
  }, [selectedTime]);

  // Convert 24h to 12h representation for display
  const { displayHour, displayMinute, isPm } = useMemo(() => {
    const hr = parseInt(timeHour, 10);
    const pm = hr >= 12;
    const hr12 = hr % 12 === 0 ? 12 : hr % 12;
    const hr12Str = hr12.toString().padStart(2, '0');
    return {
      displayHour: hr12Str,
      displayMinute: timeMinute,
      isPm: pm,
    };
  }, [timeHour, timeMinute]);

  const handlePrevMonth = () => {
    const todayMonth = moment().startOf('month');
    const prev = moment(currentMonth).subtract(1, 'month');
    if (!prev.isBefore(todayMonth)) {
      setCurrentMonth(prev);
    }
  };

  const handleNextMonth = () => {
    const maxMonth = moment().add(5, 'months').startOf('month');
    const next = moment(currentMonth).add(1, 'month');
    if (!next.isAfter(maxMonth)) {
      setCurrentMonth(next);
    }
  };

  const handleDaySelect = (dayStr: string) => {
    // If selected day is today, validate that time isn't in the past
    let targetTime = selectedTime || '09:30';
    if (dayStr === moment().format('YYYY-MM-DD')) {
      const now = moment();
      const currentHr = now.hours();
      const currentMin = now.minutes();
      const [selHr, selMin] = targetTime.split(':').map(Number);
      if (selHr < currentHr || (selHr === currentHr && selMin < currentMin)) {
        // If targetTime is in the past, adjust it to next valid hour/minute slot or current time
        const nextMin = Math.ceil(currentMin / 5) * 5;
        let adjustedHr = currentHr;
        let adjustedMin = nextMin;
        if (nextMin >= 60) {
          adjustedHr += 1;
          adjustedMin = 0;
        }
        if (adjustedHr >= 24) {
          adjustedHr = 23;
          adjustedMin = 55;
        }
        targetTime = `${adjustedHr.toString().padStart(2, '0')}:${adjustedMin.toString().padStart(2, '0')}`;
      }
    }
    onSelect(dayStr, targetTime);
  };

  const updateTime = (newHour24: string, newMinute: string) => {
    const activeDate = selectedDate || moment().format('YYYY-MM-DD');
    // If selected date is today, prevent picking past times
    if (activeDate === moment().format('YYYY-MM-DD')) {
      const now = moment();
      const hr24 = parseInt(newHour24, 10);
      const minVal = parseInt(newMinute, 10);
      if (hr24 < now.hours() || (hr24 === now.hours() && minVal < now.minutes())) {
        alert("Cannot select a past time for today.");
        return;
      }
    }
    onSelect(activeDate, `${newHour24}:${newMinute}`);
  };

  const handleHourSelect = (hr12: number) => {
    setShowHourModal(false);
    let hr24 = hr12;
    if (isPm && hr12 !== 12) {
      hr24 = hr12 + 12;
    } else if (!isPm && hr12 === 12) {
      hr24 = 0;
    }
    updateTime(hr24.toString().padStart(2, '0'), timeMinute);
  };

  const handleMinuteSelect = (min: string) => {
    setShowMinuteModal(false);
    updateTime(timeHour, min);
  };

  const handleAmPmSelect = (pm: boolean) => {
    setShowAmPmModal(false);
    const currentHr12 = parseInt(displayHour, 10);
    let hr24 = currentHr12;
    if (pm && currentHr12 !== 12) {
      hr24 = currentHr12 + 12;
    } else if (!pm && currentHr12 === 12) {
      hr24 = 0;
    }
    updateTime(hr24.toString().padStart(2, '0'), timeMinute);
  };

  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const daysGrid = useMemo(() => {
    const startOfMonth = moment(currentMonth).startOf('month');
    const daysInMonth = currentMonth.daysInMonth();
    const startDayOfWeek = startOfMonth.day();

    const list = [];
    // Empty cells before start of month
    for (let i = 0; i < startDayOfWeek; i++) {
      list.push(null);
    }
    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      list.push(moment(startOfMonth).date(d));
    }
    return list;
  }, [currentMonth]);

  const today = moment().startOf('day');

  // Generating hours (1 to 12)
  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  // Generating minutes (00 to 55 in 5 min steps)
  const minuteOptions = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

  // Split grid into weeks to resolve row spacing and detachment issues
  const weeksGrid = useMemo(() => {
    const weeks = [];
    let currentWeek = [];
    for (let i = 0; i < daysGrid.length; i++) {
      currentWeek.push(daysGrid[i]);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      // pad the last week with nulls to fill the 7 days grid properly
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }
    return weeks;
  }, [daysGrid]);

  return (
    <View style={[styles.container, style]}>
      {/* Calendar Header with navigation */}
      <View style={styles.calendarHeaderRow}>
        <Text style={styles.monthTitle}>{currentMonth.format('MMMM YYYY')}</Text>
        <View style={styles.navButtonsRow}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={handlePrevMonth}
            disabled={moment(currentMonth).subtract(1, 'month').isBefore(moment().startOf('month'))}
            accessibilityLabel="Previous month"
          >
            <ChevronLeft size={18} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, { marginLeft: 8 }]}
            onPress={handleNextMonth}
            disabled={moment(currentMonth).add(1, 'month').isAfter(moment().add(5, 'months').startOf('month'))}
            accessibilityLabel="Next month"
          >
            <ChevronRight size={18} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Weekdays Labels */}
      <View style={styles.weekdaysRow}>
        {weekdays.map((wd, index) => (
          <Text key={index} style={styles.weekdayLabel}>{wd}</Text>
        ))}
      </View>

      {/* Days Grid by Weeks */}
      <View style={styles.calendarGrid}>
        {weeksGrid.map((week, weekIndex) => (
          <View key={`week-${weekIndex}`} style={styles.weekRow}>
            {week.map((day, dayIndex) => {
              if (!day) {
                return <View key={`empty-${weekIndex}-${dayIndex}`} style={styles.dayCellContainerEmpty} />;
              }

              const dayStr = day.format('YYYY-MM-DD');
              const isSelected = selectedDate === dayStr;
              const isPast = day.isBefore(today);
              const isToday = day.isSame(today, 'day');

              return (
                <View key={`day-container-${dayStr}`} style={styles.dayCellContainer}>
                  <TouchableOpacity
                    disabled={isPast}
                    onPress={() => handleDaySelect(dayStr)}
                    style={[
                      styles.dayCell,
                      isSelected && styles.dayCellSelected,
                      isToday && !isSelected && styles.dayCellToday,
                      isPast && styles.dayCellDisabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.dayTextSelected,
                        isToday && !isSelected && styles.dayTextToday,
                        isPast && styles.dayTextDisabled,
                      ]}
                    >
                      {day.date()}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Pick-up Time section */}
      <View style={styles.timeSection}>
        <View style={styles.timeLabelContainer}>
          <Clock size={20} color={Colors.textPrimary} style={styles.clockIcon} />
          <Text style={styles.timeLabel}>Pick-up Time</Text>
        </View>

        <View style={styles.pickersContainer}>
          {/* Hour Dropdown */}
          <TouchableOpacity
            style={styles.pickerDropdown}
            onPress={() => setShowHourModal(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.pickerValue}>{displayHour}</Text>
            <ChevronDown size={14} color={Colors.textSecondary} />
          </TouchableOpacity>

          <Text style={styles.pickerSeparator}>:</Text>

          {/* Minute Dropdown */}
          <TouchableOpacity
            style={styles.pickerDropdown}
            onPress={() => setShowMinuteModal(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.pickerValue}>{displayMinute}</Text>
            <ChevronDown size={14} color={Colors.textSecondary} />
          </TouchableOpacity>

          <Text style={styles.pickerSeparator}> </Text>

          {/* AM/PM Dropdown */}
          <TouchableOpacity
            style={styles.pickerDropdown}
            onPress={() => setShowAmPmModal(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.pickerValue}>{isPm ? 'PM' : 'AM'}</Text>
            <ChevronDown size={14} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hours Selector Modal */}
      <Modal visible={showHourModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowHourModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Hour</Text>
            <FlatList
              data={hourOptions}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleHourSelect(item)}
                >
                  <Text style={[styles.modalItemText, parseInt(displayHour, 10) === item && styles.modalItemTextSelected]}>
                    {item.toString().padStart(2, '0')}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Minutes Selector Modal */}
      <Modal visible={showMinuteModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMinuteModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Minute</Text>
            <FlatList
              data={minuteOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleMinuteSelect(item)}
                >
                  <Text style={[styles.modalItemText, displayMinute === item && styles.modalItemTextSelected]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* AM/PM Selector Modal */}
      <Modal visible={showAmPmModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowAmPmModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Period</Text>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => handleAmPmSelect(false)}
            >
              <Text style={[styles.modalItemText, !isPm && styles.modalItemTextSelected]}>AM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => handleAmPmSelect(true)}
            >
              <Text style={[styles.modalItemText, isPm && styles.modalItemTextSelected]}>PM</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const getStyles = (Colors: any) => StyleSheet.create({
  container: {
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Elevation.level1,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthTitle: {
    fontFamily: Typography.headlineMd.fontFamily,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  navButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.bgInput,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weekdayLabel: {
    width: '14.28%',
    textAlign: 'center',
    fontFamily: Typography.labelMd.fontFamily,
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'column',
    gap: 8,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dayCellContainer: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCellContainerEmpty: {
    width: '14.28%',
    height: 40,
  },
  dayCell: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  dayCellSelected: {
    backgroundColor: Colors.primary,
  },
  dayCellToday: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  dayCellDisabled: {
    opacity: 0.38,
    backgroundColor: 'transparent',
  },
  dayText: {
    fontFamily: Typography.bodyMd.fontFamily,
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  dayTextSelected: {
    color: Colors.onPrimary,
    fontWeight: '700',
  },
  dayTextToday: {
    color: Colors.primary,
    fontWeight: '700',
  },
  dayTextDisabled: {
    color: Colors.textPrimary,
    textDecorationLine: 'line-through',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 16,
  },
  timeSection: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 14,
    paddingVertical: 4,
  },
  timeLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clockIcon: {
    marginRight: 2,
  },
  timeLabel: {
    fontFamily: Typography.bodyLg.fontFamily,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  pickersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bgLight,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  pickerDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Colors.bgCard,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  pickerValue: {
    fontFamily: Typography.headlineMd.fontFamily,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  pickerSeparator: {
    fontFamily: Typography.bodyMd.fontFamily,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginHorizontal: 4,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    width: '80%',
    maxHeight: '60%',
    padding: 20,
    ...Elevation.level1,
  },
  modalTitle: {
    fontFamily: Typography.headlineMd.fontFamily,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.bgInput,
  },
  modalItemText: {
    fontFamily: Typography.bodyLg.fontFamily,
    fontSize: 16,
    color: Colors.tertiary,
  },
  modalItemTextSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
