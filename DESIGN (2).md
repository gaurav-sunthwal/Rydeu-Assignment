---
name: Kinetic Travel System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#5d3f40'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#916e6f'
  outline-variant: '#e6bcbd'
  surface-tint: '#be0036'
  primary: '#ba0034'
  on-primary: '#ffffff'
  primary-container: '#e51245'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3b5'
  secondary: '#406182'
  on-secondary: '#ffffff'
  secondary-container: '#b6d8fe'
  on-secondary-container: '#3d5e7f'
  tertiary: '#555c6a'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e7583'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b5'
  on-primary-fixed: '#40000c'
  on-primary-fixed-variant: '#920027'
  secondary-fixed: '#cfe5ff'
  secondary-fixed-dim: '#a8caef'
  on-secondary-fixed: '#001d34'
  on-secondary-fixed-variant: '#274969'
  tertiary-fixed: '#dce2f3'
  tertiary-fixed-dim: '#c0c7d6'
  on-tertiary-fixed: '#151c27'
  on-tertiary-fixed-variant: '#404754'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 1rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

This design system embodies a **Modern Corporate** aesthetic tailored for the travel and logistics sector. The visual narrative focuses on efficiency, reliability, and vibrance. It utilizes a high-contrast relationship between a clean white background and a high-energy primary color to drive action.

The system prioritizes clarity and whitespace to reduce cognitive load during complex booking flows. By combining a professional sans-serif typeface with soft, approachable UI elements (rounded corners and subtle shadows), the interface feels both authoritative and user-friendly. The target audience is global travelers who value speed, transparency, and a premium service feel.

## Colors

The palette is anchored by **Vibrant Pink (#FF2D55)**, used exclusively for primary actions and key brand touchpoints to ensure high visibility and energy. 

- **Primary:** Used for main call-to-action buttons, active tab indicators, and critical highlights.
- **Secondary (Deep Blue/Black):** Provides high-contrast legibility for headings and primary body text, grounding the design in a professional tone.
- **Tertiary (Muted Grey):** Utilized for secondary text, icons, and placeholder states to create hierarchy.
- **Neutral:** A range of soft greys and whites used for backgrounds, input borders, and card containers to maintain a sense of openness and airiness.

## Typography

We use **Plus Jakarta Sans** across all levels to maintain a contemporary, approachable, and highly readable interface. The type scale is designed to create a clear information hierarchy.

- **Headlines:** Use a bold weight and tight letter spacing to command attention. For mobile devices, font sizes are capped at 24px to ensure layout integrity.
- **Body Text:** Optimized for legibility with generous line heights. Secondary information uses a slightly smaller size and a lighter grey color.
- **Labels:** Small, uppercase or semi-bold labels are used for form headers and metadata to provide structure without clutter.

## Layout & Spacing

The system follows a **Fluid Grid** model that adapts to the viewport while maintaining strict vertical rhythms. 

- **Mobile:** A single-column layout with 16px (1rem) side margins. Elements are stacked vertically with a 16px gutter.
- **Desktop:** A 12-column grid with a maximum container width of 1200px. Gutters remain fluid but typically scale to 24px-32px to increase the sense of luxury and space.
- **Spacing Rhythm:** We utilize a base-8 unit system. Components are spaced using 8px, 16px, 24px, and 48px increments to ensure visual harmony across different screen sizes.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering**. 

- **Base Level:** The background is typically white or a very light neutral (#F9FAFB).
- **Cards & Containers:** Floating elements like booking forms and info cards use a "Soft Drop" shadow: `0px 4px 20px rgba(0, 0, 0, 0.05)`. This creates depth without making the UI feel heavy.
- **Interactions:** Subtle inner shadows or slight border color shifts are used on hover/active states to provide tactile feedback. High-contrast outlines (1px) are used for form fields to ensure they are clearly defined against the white background.

## Shapes

The design system uses a **Rounded** shape language to evoke a friendly and modern feel. 

- **Standard Radius:** 8px (0.5rem) for primary buttons, input fields, and small cards.
- **Large Radius:** 16px (1rem) for major container components and modal overlays.
- **Circular:** Used specifically for icons and avatar containers to create a distinct visual contrast against rectangular elements.

## Components

### Buttons
- **Primary:** Solid Vibrant Pink background, white text, 8px border radius, bold typography. Minimum height of 48px for touch targets.
- **Secondary:** White background with a 1px Neutral border and Secondary color text.

### Input Fields
- **Text Inputs:** 1px solid grey border (#E5E7EB) with 8px radius. Labels sit outside the field. Focus state triggers a 1px primary color border or a subtle outer glow.
- **Selects:** Include a custom chevron icon.

### Cards
- **Booking Card:** White background, soft shadow (Level 1), 16px padding, and 12px border radius. Content inside is structured using the base-8 spacing scale.

### Tabs
- **Navigation Tabs:** Flat design with a 3px primary color underline for the active state. Text for inactive states uses the Tertiary color.

### Icons
- **Style:** Linear, medium stroke weight, utilizing the Secondary color for high visibility. Icons are often enclosed in a light-tinted circular background to act as visual anchors.