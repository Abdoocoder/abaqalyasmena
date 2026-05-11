# مكتبة عبق الياسمينة | Abaq Al Yasmina Stationery

Premium RTL Arabic stationery storefront for a physical store on Java Street, Amman, Jordan.

Built as a curated digital showcase — not a typical e-commerce template. Helps local customers browse products, discover categories, and initiate contact via phone or WhatsApp.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4** — custom design tokens (color, spacing, typography, easing)
- **framer-motion** — page transitions, spring entrances, magnetic button, float animation
- **lucide-react** — icon library (no external font dependencies)
- **React Router 7** — client-side routing with `AnimatePresence`

## Features

- RTL-first Arabic UI with full dark mode
- Asymmetric split-screen hero (5-column grid, 3/5 text + 2/5 image)
- Bento info grid (4-column asymmetric)
- Product category pages with brand filters
- Search across products and categories
- WhatsApp integration (direct chat with product name pre-filled)
- Google Maps embed (no API key required)
- Scroll-triggered reveal animations
- Staggered entrance animations (16-child cascade)
- Magnetic hover effect on CTAs
- Error boundary with Arabic error UI
- Full dark mode theme with 6 custom dark surface colors
- WCAG AA contrast compliance (primary CTAs use `bg-tertiary` #2C003E for 12:1+)

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Design System

### Color Palette

| Token | Value | Usage |
| --- | --- | --- |
| `primary` | `#E84CA3` | Accent, icons, links, highlights |
| `secondary` | `#E67E22` | Brand tags, category badges |
| `tertiary` | `#2C003E` | All primary CTAs (highest contrast) |
| `background` | `#FBE8C9` | Warm beige page background |
| `surface-container-lowest` | `#FDF5EA` | Card surfaces (tinted neutral) |

Full palette in `tailwind.config.js` with 6 dark variant surface colors.

### Typography

- **Headings**: Readex Pro (Arabic-optimized geometric sans)
- **Body**: Lexend (readability-optimized)
- Fluid scale: `clamp(32px, 5vw, 48px)` for display headings
- Body line length capped at 75ch

### Motion

- Custom CSS easing: `cubic-bezier(0.23, 1, 0.32, 1)` (ease-out) and `cubic-bezier(0.77, 0, 0.175, 1)` (ease-in-out)
- Button press: 160ms, `scale(0.97)`
- Spring physics: stiffness 100, damping 20 (entrances)
- Stagger delay: 40ms per child (16 max)
- Reduced motion respected via `prefers-reduced-motion`

## Project Structure

```
src/
├── assets/            # Local images (categories, products, hero, logo)
├── components/        # Shared UI components
│   ├── ErrorBoundary.jsx
│   ├── FloatingImage.jsx
│   ├── Footer.jsx
│   ├── Icon.jsx
│   ├── Layout.jsx
│   ├── MagneticButton.jsx
│   ├── Navbar.jsx
│   ├── PageTransition.jsx
│   ├── Reveal.jsx
│   └── WhatsAppButton.jsx
├── constants/
│   └── data.js        # Products, categories, contact info
├── pages/
│   ├── Categories.jsx
│   ├── CategoryPage.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   ├── Offers.jsx
│   └── SearchPage.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Contact

- **Store**: Java Street, Amman, Jordan
- **WhatsApp**: [+962 7 9193 1789](https://wa.me/962791931789)
- **Facebook**: [Abaq Al Yasmina](https://web.facebook.com/abaqalyasmena)
