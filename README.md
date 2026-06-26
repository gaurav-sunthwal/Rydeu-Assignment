# Rydeu React Native Assignment - Kinetic Travel System

A premium, high-fidelity React Native mobile application built with **Expo (v56)**, **TypeScript**, and **Zustand** for state management. The app features custom booking capabilities including a **6-month custom calendar** built using **Moment.js** following the design aesthetics of Rydeu.

---

## 📱 Features & Highlights

### 1. Authentication & Security
*   **Persistent Session:** Utilizes Zustand with AsyncStorage persistence to remember the user's logged-in state across app relaunches.
*   **Auto Routing:** Automatically directs first-time or logged-out users to the Login page and authenticated users to the Home page.
*   **Rydeu Login API integration:** Hits the staging API (`https://new-api-staging.rydeu.com/login`) with robust validation, loading indicators, and error feedback.
*   **Logout Mechanism:** Simple, secure session destruction that safely redirects the user back to login.

### 2. Kinetic Home Screen
*   **User Information:** A clean, modern header showing logged-in user profile details dynamically.
*   **Interactive Booking Layout:** Ride configuration widget with support for choosing:
    *   Trip Type (One Way vs. Hourly)
    *   Pickup & Destination locations
    *   Pickup Date & Time
*   **Premium Visuals:** Fully interactive with elegant borders, glassmorphism-inspired effects, micro-animations, and custom icons.

### 3. Custom Moment.js 6-Month Calendar
*   **Zero External UI Calendar Libraries:** Crafted entirely from scratch utilizing **Moment.js** for handling calendar calculations, date ranges, and formats.
*   **6-Month Scroll:** Allows users to view and scroll through a continuous, performant 6-month list of calendar grids.
*   **Interactive Selection:** Supports selecting a start date, time input (Hour, Minute, AM/PM), and dynamically outputs the selected date & time back to the Home Screen.
*   **Time Selector:** Inline custom time input directly integrated into the calendar view.

---

## 🛠 Tech Stack

*   **Framework:** [Expo SDK 56](https://docs.expo.dev/versions/v56.0.0/) (React Native 0.85)
*   **Language:** TypeScript
*   **Navigation:** File-based routing via `expo-router`
*   **State Management:** [Zustand](https://github.com/pmndrs/zustand) (with persist middleware)
*   **Form Management:** React Hook Form & Zod for client-side validation
*   **Date Library:** Moment.js
*   **Icons:** Lucide React Native

---

## 📂 Project Structure

```text
src/
├── app/                  # Expo Router navigation routes
│   ├── _layout.tsx       # Root layout, theme provider, and navigation gate
│   ├── index.tsx         # Home screen (Ride selection & search)
│   ├── login.tsx         # Login screen (API call, validation)
│   └── summary.tsx       # Booking summary details screen
├── assets/               # Local images, fonts, and static vectors
├── components/           # Reusable UI component library
│   ├── booking/
│   │   └── custom-calendar.tsx  # Custom 6-month calendar component
│   └── ui/               # Core design components (Button, Input, Card, Tabs, Select)
├── constants/            # Style constants, colors, and layout configurations
│   └── theme.ts          # Application color tokens, typography & spacing
├── services/             # API services and networking layer
│   └── api.ts            # Authentication requests to Rydeu API
└── store/                # Zustand global state stores
    ├── authStore.ts      # Authentication & user profile state
    ├── bookingStore.ts   # Active ride booking configurations
    └── themeStore.ts     # Dark/Light mode theme state
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) or npm/yarn installed.

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/gaurav-sunthwal/Rydeu-Assignment.git
    cd Rydeu-Assignment
    ```

2.  **Install Dependencies:**
    ```bash
    pnpm install
    # or
    npm install
    ```

### Running the App

Start the Expo development server:
```bash
pnpm start
# or
npm run start
```

*   Press `i` to open in the iOS Simulator.
*   Press `a` to open in the Android Emulator.
*   Scan the QR code with the Expo Go app on your physical device to test on mobile.

---

## 🧪 Implementation Specifications & Evaluation Criteria

1.  **Date Picker & Custom Calendar:**
    Built inside [custom-calendar.tsx](file:///Users/gaurav-sunthwal/Desktop/inten%20assiment%20/Rydeu-Assignment/src/components/booking/custom-calendar.tsx), it renders exactly 6 months starting from the current month. Each month is calculated on-the-fly with Moment.js grid generation (`moment().add(i, 'months')`).
2.  **State Management:**
    Uses Zustand stores located in [src/store](file:///Users/gaurav-sunthwal/Desktop/inten%20assiment%20/Rydeu-Assignment/src/store) to maintain separation of concerns:
    *   [authStore.ts](file:///Users/gaurav-sunthwal/Desktop/inten%20assiment%20/Rydeu-Assignment/src/store/authStore.ts) controls the login session, API token persistence, and logout action.
    *   [bookingStore.ts](file:///Users/gaurav-sunthwal/Desktop/inten%20assiment%20/Rydeu-Assignment/src/store/bookingStore.ts) handles selected ride variables such as pickup location, destination, and selected calendar dates.
3.  **Authentication Credentials:**
    The login screen utilizes the staging API. To sign in:
    *   **Email:** `rydeu@email10p.org`
    *   **Password:** `123456`
