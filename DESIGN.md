# Abaq Al Yasmina — Visual Design Direction

## Brand Identity
| Attribute | Value |
|-----------|-------|
| Store | Abaq Al Yasmina Stationery — Rainbow Street 12 (شارع قوس قزح ١٢), Amman, Jordan |
| Personality | Modern, Premium, Approachable, Locally grounded |
| Concept Spine | **Artifact / Collectible** — products framed as treasured objects, curated specimens |
| Second-Read | A macro product crop carrying the brand pink (#E84CA3) naturally (e.g. a notebook edge, pen barrel) appearing once |
| Conversion Goal | Get the customer to initiate contact (WhatsApp / phone) |

## Active Configuration
- DESIGN_VARIANCE: 7
- VISUAL_DENSITY: 4
- ART_DIRECTION: 7
- IMPLEMENTATION_CLARITY: 9
- IMAGE_USAGE_PRIORITY: 8
- SPACING_GENEROSITY: 8
- LAYOUT_VARIATION: 7
- CONVERSION_DISCIPLINE: 8

## Global Constants (All 8 Sections)

### Palette (locked across all sections)
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#E84CA3` | Accent, icons, highlights, selected states |
| On-primary | `#FFFFFF` | Text on primary |
| Secondary | `#E67E22` | Warm accent, brand tags |
| Tertiary | `#2C003E` | All primary CTAs (highest contrast) |
| Background | `#FBE8C9` | Warm beige page background |
| Surface | `#FDF5EA` | Card surfaces (tinted neutral) |
| On-surface | `#1B1B1B` | Body text |
| On-surface-variant | `#5A4A38` | Secondary text |
| Ink | `#2C003E` | Deep headings, footer background |
| Line | `#EBD0AC` | Hairlines, dividers |

### Typography (locked)
- **Display / Headings**: Readex Pro (Arabic-optimized geometric sans, weights 400/600/700)
- **Body / UI**: Lexend (readability-optimized, weight 400/500)
- **Scale**: `clamp(32px, 5vw, 48px)` display, `24px` headlines, `16px` body, `14px` small, `12px` label
- **Line length**: 75ch max for body text
- **Arabic-first**: RTL throughout

### Motion (locked)
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` (ease-out), `cubic-bezier(0.77, 0, 0.175, 1)` (ease-in-out)
- Spring: stiffness 100, damping 20
- Stagger: 40ms per child
- Reduced motion respected

### Border Radius Language (locked)
- Cards/CTAs: `rounded-xl` (12px)
- Hero image: `rounded-3xl` (24px)
- Pills/tags: `rounded-full`

### CTA Family (locked identity, varied style)
- Primary: `bg-tertiary text-on-tertiary` (#2C003E bg, white text), solid pill, prominent
- Secondary: outline with primary color, for less emphasized actions
- Tertiary: underlined inline link with arrow icon

### Image Treatment (locked)
- Warm tone grade matching beige palette
- Soft desaturation on backgrounds (opacity 20% hero bg, 85% on cards)
- Gradient overlays: `from-inverse-surface/90` for text legibility
- Macro product crops where possible

---

## Section-by-Section Plan

---

### Section 1 of 8: Hero
**Job**: Hook. Communicate brand instantly. One unmistakable action.

- **Hero Scale**: Mid Editorial — balanced, product-led
- **Composition Anchor**: Bottom-left text over full-bleed background image (NOT left-text/right-image)
- **Background Mode**: Full-bleed stationery image background with warm tonal overlay
- **CTA Variation**: Classic primary pill (WhatsApp) + secondary outline (phone call)
- **Signature Component**: none (hero is self-contained)
- **Density**: Airy. Large type, generous padding. Text sits in lower-left ~35% of viewport.
- **Copy**:
  - H1: "مكتبة عبق الياسمينة — وجهتك للقرطاسية في عمان"
  - Sub: "متجرك الموثوق للأدوات المكتبية في شارع قوس قزح، جودة عالية، خدمة أسرع"
  - CTA: "تواصل عبر واتساب" (primary) + "اتصل بالمتجر" (secondary outline)
- **Visual**: Background is a high-quality stationery flat-lay (notebooks, pens, organized desk) with warm gradient overlay from bottom-left to transparent. Brand logo top-left.

---

### Section 2 of 8: Trust Bar — Contact & Location
**Job**: Immediate proof — real store, real location, real hours.

- **Composition Anchor**: Centered statement / metrics strip
- **Background Mode**: Solid surface (warm beige) with paper-like subtle texture
- **CTA Variation**: Underlined inline link with arrow (for directions)
- **Signature Component**: Oversized Metrics Strip — but adapted as info tiles (location, hours, phone) in a 3-column row
- **Density**: Compact, horizontal. Three info blocks with icons, side by side.
- **Copy**:
  - Location pin icon + "شارع قوس قزح ١٢، عمان"
  - Clock icon + "ساعات العمل: ٩:٠٠ صباحاً — ٩:٠٠ مساءً"
  - Phone icon + "٠٧٩١٩٣١٧٨٩"
- **Visual**: Three clean cards with subtle shadow, icon in pink circle, Arabic text. No heading needed — reads as instant trust.

---

### Section 3 of 8: Categories Showcase
**Job**: Browse categories, discover products.

- **Composition Anchor**: Top-left lead, support bottom-right
- **Background Mode**: Solid surface + inline asset (category images)
- **CTA Variation**: Underlined inline link with arrow ("عرض جميع التصنيفات")
- **Signature Component**: Pristine Gapless Bento Grid — 4 category cards in 2×2 or 4-col grid, no visual gaps, image-led
- **Density**: Medium — cards fill width, clean spacing between grid and heading
- **Copy**:
  - Heading: "تصفح التصنيفات"
  - Sub: "دفاتر، أقلام، حقائب، أدوات فنية — كل ما تحتاج"
  - Per card: category name in Arabic overlay, tagline as label
- **Visual**: Category cards as image-led tiles with gradient bottom overlay and Arabic name in white. Arrow icon appears on hover. Grid feels like a curated collection.

---

### Section 4 of 8: Featured Products
**Job**: Showcase quality — curated, not dumped.

- **Composition Anchor**: Left-third caption + right-two-thirds product grid
- **Background Mode**: Flat color block (surface-container-low) + product detail crops
- **CTA Variation**: CTA as caption under a strong visual (WhatsApp per product)
- **Signature Component**: Layered Image Crop Frames — products shown with intentional cropping (not uniform boxes)
- **Density**: Medium-high — products in staggered 3-column grid but with generous padding
- **Copy**:
  - Heading: "منتجات مختارة"
  - Sub: "تشكيلتنا الأفضل — جودة تضاهي التوقعات"
- **Visual**: Product cards with brand/tag pill top-left, price top-right, product image dominating, subtle shadow. WhatsApp button integrated cleanly at bottom of each card. Mix of product photography crops.

---

### Section 5 of 8: Offers & Bundles
**Job**: Promote deals, create urgency.

- **Composition Anchor**: Off-grid editorial offset (first bundle wider, second offset)
- **Background Mode**: Editorial side-image (60/40 split — image left, text right)
- **CTA Variation**: Classic primary pill contrasting against background
- **Signature Component**: Split Testimonial Quote Wall — adapted as offer cards that alternate image/text layout
- **Density**: Generous — large section, lots of breathing room
- **Copy**:
  - Heading: "عروض وحزم"
  - Tag: new badge or "لفترة محدودة"
  - Bundle title, description, price
  - CTA: "اطلب العرض"
- **Visual**: Alternating layout — first bundle is image-left/text-right, second is image-right/text-left. Bold tag badge in tertiary color. Clean backgrounds.

---

### Section 6 of 8: Testimonials / Customer Love
**Job**: Social proof, community trust.

- **Composition Anchor**: Centered statement (quote wall)
- **Background Mode**: Quiet textured paper / material background
- **CTA Variation**: Outline / ghost (non-intrusive)
- **Signature Component**: Split Testimonial Quote Wall — pull quotes with customer names, in a staggered 2-column arrangement
- **Density**: Airy — 3-4 quotes with generous whitespace
- **Copy**:
  - Heading: "ماذا يقول عملاؤنا"
  - Quotes in Arabic from local customers (short, believable)
- **Visual**: Cards with subtle paper texture background, quote mark icon in primary color top-left, short quote, customer name below. Cards slightly offset for organic feel.

---

### Section 7 of 8: Map & Visit
**Job**: Remove friction for physical visit.

- **Composition Anchor**: Right-third caption + left-two-thirds map visual
- **Background Mode**: Image as the entire visual (map embed preview) + text overlaid in clean area
- **CTA Variation**: Underlined inline link with arrow ("احصل على الاتجاهات") + Banner-style full-width CTA for phone
- **Signature Component**: Vertical Rhythm Lines — address info on the right with hairline separators
- **Density**: Medium — map dominates left 2/3, text info column on right.
- **Copy**:
  - "زورنا في المتجر"
  - Address, hours, phone, "اتصل الآن" button
- **Visual**: Left 2/3 is a clean map preview (screenshot-style). Right 1/3 is a vertical list of contact info with thin dividers. Secondary CTA for directions below map.

---

### Section 8 of 8: Final CTA + Footer
**Job**: Close. One last unmistakable action.

- **Composition Anchor**: Stacked center (label / headline / sub / CTA all centered)
- **Background Mode**: Color-blocked diptych — top half is tertiary dark, bottom half is warm beige footer
- **CTA Variation**: Banner-style full-width CTA on dark background
- **Signature Component**: Infinite Brand Marquee Strip — subtle brand name repetition at bottom
- **Density**: Airy top section, compact footer below
- **Copy**:
  - Headline: "تواصل معنا اليوم"
  - Sub: "نحن هنا لمساعدتك — استفسر عن المنتجات أو الطلبات"
  - CTA: "راسلنا على واتساب" (big, prominent)
  - Footer: copyright, links to categories/offers/contact, social (Facebook)
- **Visual**: Top half: dark purple (#2C003E) with centered white text and prominent WhatsApp green button. Bottom half: warm beige footer with logo, 3-column link layout, copyright.

---

## Signature Components Used (4)
1. **Pristine Gapless Bento Grid** — Categories (section 3)
2. **Layered Image Crop Frames** — Featured products (section 4)
3. **Split Testimonial Quote Wall** — Testimonials (section 6) + adapted for offers (section 5)
4. **Vertical Rhythm Lines** — Map/visit info (section 7)

## Composition Anchor Variety (across 8 sections)
1. Bottom-left text over background image
2. Centered statement (metrics strip)
3. Top-left lead, support bottom-right
4. Left-third caption + right-two-thirds visual
5. Off-grid editorial offset
6. Centered statement (quote wall)
7. Right-third caption + left-two-thirds visual
8. Stacked center

## Background Mode Variety (across 8 sections)
1. Full-bleed image background with tonal overlay
2. Solid surface with paper texture
3. Solid surface + inline asset
4. Flat color block + product detail crops
5. Editorial side-image (60/40)
6. Quiet textured paper background
7. Image as the entire visual + text overlaid
8. Color-blocked diptych

## CTA Variety (across 8 sections)
1. Classic primary pill (WhatsApp) + secondary outline (phone)
2. Underlined inline link with arrow
3. Underlined inline link with arrow
4. CTA as caption (WhatsApp per product)
5. Classic primary pill (contrasting)
6. Outline / ghost
7. Underlined inline link + banner-style full-width
8. Banner-style full-width CTA
