import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import { ChevronLeft, CheckCircle, Calendar, Clock, User, ArrowRight, Sun, Moon } from 'lucide-react-native';
import { useAuthStore } from '../store/authStore';
import { useBookingStore } from '../store/bookingStore';
import { useThemeStore } from '../store/themeStore';
import { useColors, Spacing, Typography } from '../constants/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SummaryScreen() {
  const user = useAuthStore((state) => state.user);
  const { pickupDate, pickupTime } = useBookingStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const Colors = useColors();
  const insets = useSafeAreaInsets();

  const formattedDate = useMemo(() => {
    return pickupDate ? moment(pickupDate).format('dddd, MMMM DD, YYYY') : 'Not selected';
  }, [pickupDate]);

  const formattedTime = useMemo(() => {
    if (!pickupTime) return 'Not selected';
    const [hr, min] = pickupTime.split(':');
    const hrInt = parseInt(hr || '9', 10);
    const pm = hrInt >= 12;
    const hr12 = hrInt % 12 === 0 ? 12 : hrInt % 12;
    const ampm = pm ? 'PM' : 'AM';
    return `${hr12.toString().padStart(2, '0')}:${min.padStart(2, '0')} ${ampm}`;
  }, [pickupTime]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
          <ChevronLeft size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Confirmation</Text>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme} activeOpacity={0.8}>
          {isDarkMode ? (
            <Sun size={18} color={Colors.primary} />
          ) : (
            <Moon size={18} color={Colors.primary} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 + insets.bottom }]} showsVerticalScrollIndicator={false}>
        {/* Success Animation Area */}
        <View style={styles.successArea}>
          <View style={styles.iconRing}>
            <CheckCircle size={64} color={Colors.primary} />
          </View>
          <Text style={styles.successTitle}>Booking Saved!</Text>
          <Text style={styles.successSubtitle}>Your ride details have been securely stored</Text>
        </View>

        {/* Saved Time Card */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <Calendar size={20} color={Colors.primary} />
            <Text style={styles.cardHeaderTitle}>Schedule Details</Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIconCol}>
              <Calendar size={18} color={Colors.textSecondary} />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>{formattedDate}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconCol}>
              <Clock size={18} color={Colors.textSecondary} />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={styles.infoLabel}>Pickup Time</Text>
              <Text style={styles.infoValue}>{formattedTime}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconCol}>
              <User size={18} color={Colors.textSecondary} />
            </View>
            <View style={styles.infoTextCol}>
              <Text style={styles.infoLabel}>Passenger</Text>
              <Text style={styles.infoValue}>{user?.username || 'Rydeu Guest'}</Text>
            </View>
          </View>
        </View>

        {/* Bottom Actions */}
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.85}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.actionButtonText}>Back to Dashboard</Text>
          <ArrowRight size={18} color={Colors.onPrimary} />
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: Colors.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    width: wp('10.5%'),
    height: wp('10.5%'),
    borderRadius: wp('5.25%'),
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: Typography.headlineMd.fontFamily,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  themeButton: {
    width: wp('10.5%'),
    height: wp('10.5%'),
    borderRadius: wp('5.25%'),
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: wp('4.5%'),
    paddingTop: 30,
    gap: 24,
  },
  successArea: {
    alignItems: 'center',
    marginVertical: 10,
  },
  iconRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: Typography.headlineLg.fontFamily,
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  successSubtitle: {
    fontFamily: Typography.bodyMd.fontFamily,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  cardHeaderTitle: {
    fontFamily: Typography.headlineMd.fontFamily,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 4,
  },
  infoIconCol: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextCol: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: Typography.labelMd.fontFamily,
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: Typography.bodyLg.fontFamily,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 12,
  },
  actionButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    fontFamily: Typography.button.fontFamily,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onPrimary,
  },
});
