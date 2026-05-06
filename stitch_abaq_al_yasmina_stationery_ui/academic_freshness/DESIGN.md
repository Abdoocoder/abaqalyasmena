---
name: Academic Freshness
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1b1b'
  on-surface-variant: '#404943'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#707973'
  outline-variant: '#bfc9c1'
  surface-tint: '#2c694e'
  primary: '#0f5238'
  on-primary: '#ffffff'
  primary-container: '#2d6a4f'
  on-primary-container: '#a8e7c5'
  inverse-primary: '#95d4b3'
  secondary: '#5f5e5b'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2dd'
  on-secondary-container: '#656461'
  tertiary: '#5a4400'
  on-tertiary: '#ffffff'
  tertiary-container: '#775b06'
  on-tertiary-container: '#fcd579'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1f0ce'
  primary-fixed-dim: '#95d4b3'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#0e5138'
  secondary-fixed: '#e5e2dd'
  secondary-fixed-dim: '#c9c6c2'
  on-secondary-fixed: '#1c1c19'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#ffdf96'
  tertiary-fixed-dim: '#e7c268'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5a4400'
  background: '#fcf9f8'
  on-background: '#1b1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-base:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is built on the intersection of academic structure and creative warmth. It serves students and professionals in Amman by providing a digital environment that feels as organized and tactile as a high-quality notebook.

The visual style is **Corporate / Modern** with a strong leaning toward **Minimalism**. By prioritizing generous whitespace and a "Figma-like" interface density, the system evokes a sense of professional precision while remaining approachable. The interface should feel airy and light, using the "Paper-like" secondary tones to ground the experience in the physical world of stationery.

## Colors

The palette is anchored by a deep, "Academic Green" that suggests growth and education. This is balanced by a light, warm beige that mimics the texture and tone of premium cream-colored paper.

- **Primary Green:** Used for main actions, brand identity, and headers. It should feel fresh and authoritative.
- **Secondary Beige:** Used for large surface areas, section backgrounds, and container fills to reduce eye strain and add warmth.
- **Accent Gold (Tertiary):** Inspired by brass stationery tools; used sparingly for highlights or high-priority notifications.
- **Status Colors:** Use standard semantic greens (success) and reds (error), but desaturated slightly to match the professional tone.

## Typography

This design system utilizes a dual-font strategy optimized for both English and Arabic. 

**Plus Jakarta Sans** provides a modern, geometric feel for headlines, while **Lexend** is chosen for body text due to its specific design for readability and educational contexts. For Arabic implementation, use **Cairo** for headlines to match the geometric weight of Jakarta, and **Tajawal** for body text to maintain the clean, sans-serif aesthetic.

All typography must maintain high contrast against the "Paper" background. Line heights are intentionally generous to improve legibility during long browsing sessions.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop and a fluid model on mobile. Content is centered within a 1280px container to ensure focus and readability.

A strict 4px/8px baseline grid is used to maintain a "systematic" look. Elements should be spaced with a "generous whitespace" philosophy—when in doubt, increase the margin. This creates the professional, high-end feel requested, preventing the store from looking cluttered like a typical discount retailer.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layers**. 

The background is a crisp white, while the "Paper Beige" acts as a secondary layer for grouped content (like a sidebar or a card container). Shadows should be extremely soft, using a 10-15% opacity of the Primary Green rather than pure black to keep the UI looking "fresh."

**Elevation Levels:**
- **Level 0 (Flat):** Main background.
- **Level 1 (Soft Border):** Subtle 1px borders in a light grey-beige for input fields.
- **Level 2 (Float):** Cards and buttons use a wide-spread shadow (20px blur, 4px Y-offset) to appear lifted off the page.

## Shapes

The shape language is consistently **Rounded**, utilizing a 12px to 16px radius for all primary containers and buttons. This softening of the geometry makes the academic brand feel student-friendly and modern.

Buttons should use the `rounded-lg` (16px) setting to feel "squishy" and tactile, while product cards should use the standard `rounded` (12px) for a structured yet approachable look.

## Components

- **Buttons:** Primary buttons use the Academic Green with white text. Hover states should transition to a slightly darker shade with a subtle increase in shadow spread. Secondary buttons use the Paper Beige with Green text.
- **Input Fields:** Large 16px rounded corners with a subtle 1px border. On focus, the border should thicken to 2px in Primary Green.
- **Cards:** Product cards must have a clean white background, a 12px corner radius, and no border. Depth is conveyed entirely through the ambient green-tinted shadow.
- **Chips/Tags:** Used for categories (e.g., "Backpacks," "Fine Arts"). Use the Secondary Beige background with dark green text to keep them subtle.
- **RTL Support:** All components are designed to flip on the X-axis for Arabic. Iconography should be carefully selected to be culturally appropriate and directionally correct (e.g., back arrows reversing).
- **Product Gallery:** High-quality imagery should be framed with a light beige background within the card to give a "studio photography" feel to the supplies.