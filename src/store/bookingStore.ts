import { create } from 'zustand';

export interface BookingState {
  activeTab: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  durationHours: string; // for hourly booking
  passengers: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  setActiveTab: (tab: string) => void;
  setPickupLocation: (loc: string) => void;
  setDropoffLocation: (loc: string) => void;
  setPickupDate: (date: string) => void;
  setPickupTime: (time: string) => void;
  setDurationHours: (hours: string) => void;
  setPassengers: (count: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetForm: () => void;
}

const initialState = {
  activeTab: 'one-way',
  pickupLocation: '',
  dropoffLocation: '',
  pickupDate: '',
  pickupTime: '',
  durationHours: '2',
  passengers: 1,
  isLoading: false,
  error: null,
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,

  setActiveTab: (activeTab) => set({ activeTab }),
  setPickupLocation: (pickupLocation) => set({ pickupLocation }),
  setDropoffLocation: (dropoffLocation) => set({ dropoffLocation }),
  setPickupDate: (pickupDate) => set({ pickupDate }),
  setPickupTime: (pickupTime) => set({ pickupTime }),
  setDurationHours: (durationHours) => set({ durationHours }),
  setPassengers: (passengers) => set({ passengers }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  resetForm: () => set({ ...initialState }),
}));
