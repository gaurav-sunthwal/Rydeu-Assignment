import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Calendar, Check, LogOut, Moon, Sun, User } from 'lucide-react-native';
import moment from 'moment';
import React, { useMemo } from 'react';
import { ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomCalendar } from '../components/booking/custom-calendar';
import { useColors, Spacing, Typography } from '../constants/theme';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import { useBookingStore } from '../store/bookingStore';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const Colors = useColors();
  const insets = useSafeAreaInsets();

  const { pickupDate, pickupTime, setPickupDate, setPickupTime } = useBookingStore();

  React.useEffect(() => {
    if (!pickupDate) {
      setPickupDate(moment().format('YYYY-MM-DD'));
    }
    if (!pickupTime) {
      // Set to a future time (e.g. now + 30 mins)
      const now = moment().add(30, 'minutes');
      setPickupTime(`${now.hours().toString().padStart(2, '0')}:${(Math.ceil(now.minutes() / 5) * 5).toString().padStart(2, '0')}`);
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const handleDateTimeChange = (date: string, time: string) => {
    setPickupDate(date);
    setPickupTime(time);
  };

  const formattedDateTime = useMemo(() => {
    const activeDate = pickupDate || moment().format('YYYY-MM-DD');
    const activeTime = pickupTime || '09:30';

    const dateObj = moment(activeDate);
    const [hr, min] = activeTime.split(':');
    const hrInt = parseInt(hr || '9', 10);
    const pm = hrInt >= 12;
    const hr12 = hrInt % 12 === 0 ? 12 : hrInt % 12;
    const ampm = pm ? 'PM' : 'AM';

    return `${dateObj.format('MMM DD, YYYY')} • ${hr12.toString().padStart(2, '0')}:${min.padStart(2, '0')} ${ampm}`;
  }, [pickupDate, pickupTime]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      {/* Header bar matching screenshot with settings and logout */}
      <View style={styles.header}>
        <View style={styles.userInfoRow}>
          <View style={styles.avatar}>
            <User size={18} color={Colors.primary} />
          </View>
          <View style={styles.userTextContainer}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.usernameText}>{user?.username || 'Rydeu Guest'}</Text>
          </View>
        </View>
        <View style={styles.headerActionsRow}>
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={toggleTheme}
            activeOpacity={0.8}
          >
            {isDarkMode ? (
              <Sun size={18} color={Colors.primary} />
            ) : (
              <Moon size={18} color={Colors.primary} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
            <LogOut size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 + insets.bottom }]} showsVerticalScrollIndicator={false}>
        {/* Title area matching screenshot - improved typography hierarchy */}
        <View style={styles.titleRow}>
          <Text style={styles.screenTitle}>Select Date & Time</Text>
          <TouchableOpacity style={styles.nextMonthsButton} activeOpacity={0.7}>
            <Text style={styles.nextMonthsText}>Next 6 Months</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Calendar Card */}
        <CustomCalendar
          selectedDate={pickupDate || moment().format('YYYY-MM-DD')}
          selectedTime={pickupTime || '09:30'}
          onSelect={handleDateTimeChange}
          style={styles.calendarContainer as StyleProp<ViewStyle>}
        />

        {/* Scheduled Info Section - improved capitalization and readability */}
        <View style={styles.scheduledCard}>
          <View style={styles.scheduledIconCircle}>
            <Calendar size={20} color={Colors.onPrimary} />
          </View>
          <View style={styles.scheduledTextContainer}>
            <Text style={styles.scheduledLabel}>Scheduled for</Text>
            <Text style={styles.scheduledValue}>{formattedDateTime}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Persistent Bottom Action Bar (Complete flow affordance) */}
      <View style={[styles.bottomActionBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.bottomSummaryCol}>
          <Text style={styles.bottomSummaryLabel}>Selected Date</Text>
          <Text style={styles.bottomSummaryValue}>
            {pickupDate ? moment(pickupDate).format('ddd, MMM DD') : 'Select date'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={() => router.push('/summary')}
        >
          <Text style={styles.confirmButtonText}>Continue</Text>
          <Check size={18} color={Colors.onPrimary} style={styles.confirmIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (Colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4.5%'),
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: wp('10.5%'),
    height: wp('10.5%'),
    borderRadius: wp('5.25%'),
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userTextContainer: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontFamily: Typography.bodyMd.fontFamily,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  usernameText: {
    fontFamily: Typography.headlineMd.fontFamily,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconButton: {
    width: wp('10.5%'),
    height: wp('10.5%'),
    borderRadius: wp('5.25%'),
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    width: wp('10.5%'),
    height: wp('10.5%'),
    borderRadius: wp('5.25%'),
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: wp('4.5%'),
    paddingTop: 20,
    paddingBottom: 100, // extra padding for bottom actions bar
    gap: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  screenTitle: {
    fontFamily: Typography.headlineLg.fontFamily,
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
    flex: 1,
  },
  nextMonthsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
  },
  nextMonthsText: {
    fontFamily: Typography.bodyMd.fontFamily,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  calendarContainer: {
    marginBottom: 4,
  },
  scheduledCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.primaryBorder,
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  scheduledIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduledTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scheduledLabel: {
    fontFamily: Typography.labelMd.fontFamily,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  scheduledValue: {
    fontFamily: Typography.bodyLg.fontFamily,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  searchButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchButtonText: {
    fontFamily: Typography.button.fontFamily,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onPrimary,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingHorizontal: wp('4.5%'),
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  bottomSummaryCol: {
    flex: 1,
  },
  bottomSummaryLabel: {
    fontFamily: Typography.labelMd.fontFamily,
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  bottomSummaryValue: {
    fontFamily: Typography.bodyLg.fontFamily,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  confirmButton: {
    flex: 1.5,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  confirmButtonText: {
    fontFamily: Typography.button.fontFamily,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onPrimary,
    marginRight: 6,
  },
  confirmIcon: {
    marginLeft: 2,
  },
});
