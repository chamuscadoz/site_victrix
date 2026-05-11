---
name: victrix-brand
description: >
  Apply Victrix Capital's visual identity to any output — tables, charts, images,
  emails, dashboards, GIFs, documents, websites, or presentations. Use this skill
  whenever the user mentions Victrix Capital, asks to generate a branded output,
  references the Victrix color palette, wants to use the Zalando Sans font, needs
  a table or chart in the Victrix style, or asks to apply "the brand" to anything.
  Also use when generating marketing assets, email templates, financial reports,
  weekly digests, LinkedIn posts, or institutional content for Victrix Capital.
  This skill is essential for maintaining visual consistency across all Victrix
  outputs. Trigger even for partial mentions like "Victrix", "brand colors",
  "our palette", "green identity", or when the user is working on the Victrix
  website (site_victrix project).
---

# Victrix Capital — Brand Identity Skill

> Source: VictrixCapital_guidelines_v01.pdf (Abril 2026)

## Overview

Victrix Capital is a Brazilian investment advisory firm (Escritório de Assessoria de
Investimentos, credenciado à XP Investimentos). Founded by three professionals with
over a decade of experience at J.P. Morgan, the firm combines discipline, strategic
context reading, senior proximity, and institutional clarity.

All outputs must reflect: **precision, calm, modernity** — without spectacle or
romanticism.

### Brand Identity

**The brand IS:** escritório de assessoria de investimentos, leitura estratégica de
contexto, proximidade sênior, clareza institucional.

**The brand IS NOT:** banco, asset, wealth manager, consultoria financeira
independente, research house, gestora, administradora de carteira.

### Core Values

- **Experiência** — investimos profissionalmente por diversos ciclos do mercado
  internacional e doméstico
- **Disciplina** — governança e disciplina no processo de investimentos, no mais
  alto padrão internacional
- **Integridade** — inegociável, acima de conflitos e verificada ao longo da história

---

## Color Palette (Official — from guidelines)

| Token       | Hex       | RGB              | CMYK              | Pantone          | Usage                                              |
|-------------|-----------|------------------|--------------------|------------------|-----------------------------------------------------|
| Lime Green  | `#88E833` | 136/232/51       | 40/0/80/10         | 374 U            | Highlights, KPI values, accents, logo, CTA buttons  |
| Deep Forest | `#0E1C0E` | 14/28/14         | 50/0/50/90         | 5535 U           | Primary background, overlays on blur                 |
| Charcoal    | `#262626` | 38/38/38         | 0/0/0/—            | Neutral Black U  | Text on light backgrounds                            |
| Mid Green   | `#2E6F3A` | 46/111/58        | 60/0/50/55         | 346 U            | Header fills, alternating rows, secondary elements   |
| Sage        | `#D5DAD0` | 213/218/208      | 0/0/5/15           | 621 U            | Body text on dark, neutral fills, secondary values   |
| White       | `#FFFFFF` | 255/255/255      | —                  | —                | Primary text on dark headers                         |
| Alt Row     | `#152615` | —                | —                  | —                | Alternating table row fill (dark theme)              |
| Red         | `#C0392B` | —                | —                  | —                | Negative values, downward arrows                     |

**Priority rule:** Lime Green (`#88E833`) and Deep Forest (`#0E1C0E`) are the primary
pair. Prioritize these whenever variety must be limited.

---

## Typography

**Primary font: Zalando Sans Semi Expanded**
Download: https://fonts.google.com/specimen/Zalando+Sans+SemiExpanded

The identity uses a single type family. Used in uppercase and lowercase, it creates
balanced contrast with the Victrix logotype weight. Its contemporary construction,
with clean and expressive forms, supports communication with clarity and
sophistication. The family is extensive — from ExtraLight to Black — offering
flexibility and multiple composition possibilities.

### Font files location in project

```
assets/fonts/static/ZalandoSansSemiExpanded-*.ttf
assets/fonts/ZalandoSansSemiExpanded-VariableFont_wght.ttf
assets/fonts/ZalandoSansSemiExpanded-Italic-VariableFont_wght.ttf
```

### Weight usage guide

| Weight     | File                                        | Usage                                    |
|------------|---------------------------------------------|------------------------------------------|
| ExtraLight | `ZalandoSansSemiExpanded-ExtraLight.ttf`    | Year labels (e.g. "2026"), subtitles      |
| Light      | `ZalandoSansSemiExpanded-Light.ttf`         | Axis labels, footnotes, "(BCB)"           |
| Regular    | `ZalandoSansSemiExpanded-Regular.ttf`       | Body text, descriptions, even rows        |
| Medium     | `ZalandoSansSemiExpanded-Medium.ttf`        | Secondary emphasis                        |
| SemiBold   | `ZalandoSansSemiExpanded-SemiBold.ttf`      | Column headers, odd rows, legend          |
| Bold       | `ZalandoSansSemiExpanded-Bold.ttf`          | Section titles, KPI values, "Hoje"        |
| ExtraBold  | `ZalandoSansSemiExpanded-ExtraBold.ttf`     | Display headings                          |
| Black      | `ZalandoSansSemiExpanded-Black.ttf`         | Maximum impact display                    |

### Loading fonts in CSS

```css
@font-face {
  font-family: 'Zalando Sans SemiExpanded';
  src: url('assets/fonts/ZalandoSansSemiExpanded-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
}
```

### Loading fonts in Python (matplotlib)

```python
import matplotlib.font_manager as fm
import os

font_dir = os.path.join(os.path.dirname(__file__), 'assets/fonts/static/')
fp_xlight = fm.FontProperties(fname=font_dir+'ZalandoSansSemiExpanded-ExtraLight.ttf')
fp_light  = fm.FontProperties(fname=font_dir+'ZalandoSansSemiExpanded-Light.ttf')
fp_reg    = fm.FontProperties(fname=font_dir+'ZalandoSansSemiExpanded-Regular.ttf')
fp_med    = fm.FontProperties(fname=font_dir+'ZalandoSansSemiExpanded-Medium.ttf')
fp_semi   = fm.FontProperties(fname=font_dir+'ZalandoSansSemiExpanded-SemiBold.ttf')
fp_bold   = fm.FontProperties(fname=font_dir+'ZalandoSansSemiExpanded-Bold.ttf')
fp_xbold  = fm.FontProperties(fname=font_dir+'ZalandoSansSemiExpanded-ExtraBold.ttf')
fp_black  = fm.FontProperties(fname=font_dir+'ZalandoSansSemiExpanded-Black.ttf')
```

---

## Logo System

The logo is the primary brand identifier. It was developed from a base typeface,
subsequently modified to become exclusive. It carries its own traces, designed
to express identity, presence, and immediate recognition.

**Never recolor, distort, or recreate the logo.** Always use official files.

### Logo variants available in project

#### Victrix (sem XP)

| Variant                   | Path (SVG preferred)                                                    |
|---------------------------|-------------------------------------------------------------------------|
| With "CAPITAL" inline     | `assets/images/Logos/Logo_sem_XP/Vector/a. Logo w_ Capital/svg01.svg`   |
| Without "CAPITAL"         | `assets/images/Logos/Logo_sem_XP/Vector/b. Logo s_ Capital/svg01.svg`   |
| "CAPITAL" below           | `assets/images/Logos/Logo_sem_XP/Vector/c. Logo downCapital/svg01_1.svg`|

#### Victrix + XP (use when institutional attribution is required)

| Color    | Variant                | SVG Path                                                                          |
|----------|------------------------|-----------------------------------------------------------------------------------|
| Black    | Without Capital        | `assets/images/Logos/Logo_Victrix_XP/black/Vector/victrix_xp_.withoutCapital.svg`  |
| Black    | With Capital (inline)  | `assets/images/Logos/Logo_Victrix_XP/black/Vector/victrix_xp_.withCapital.svg`     |
| Black    | With Capital (below)   | `assets/images/Logos/Logo_Victrix_XP/black/Vector/victrix_xp_.withCapital2.svg`    |
| DarkGreen| Without Capital        | `assets/images/Logos/Logo_Victrix_XP/darkgreen/Vector/victrix_xp_.withoutCapital_green.svg` |
| DarkGreen| With Capital (inline)  | `assets/images/Logos/Logo_Victrix_XP/darkgreen/Vector/victrix_xp_.within_Capital_green.svg` |
| DarkGreen| With Capital (below)   | `assets/images/Logos/Logo_Victrix_XP/darkgreen/Vector/victrix_xp_.withdownCapital_green.svg`|
| Green    | Without Capital        | `assets/images/Logos/Logo_Victrix_XP/green/vector/victrix_xp_.withoutCapital_green.svg`     |
| Green    | With Capital (inline)  | `assets/images/Logos/Logo_Victrix_XP/green/vector/victrix_xp_.withCapital_green.svg`        |
| Green    | With Capital (below)   | `assets/images/Logos/Logo_Victrix_XP/green/vector/victrix_xp_.withdownCapital_green.svg`    |
| White    | Without Capital        | `assets/images/Logos/Logo_Victrix_XP/white/Vector/victrix_xp_without_Capital_white.png.svg` |
| White    | With Capital (inline)  | `assets/images/Logos/Logo_Victrix_XP/white/Vector/victrix_xp_within_Capital_white.svg`      |
| White    | With Capital (below)   | `assets/images/Logos/Logo_Victrix_XP/white/Vector/victrix_xp_withdown_Capital_white.svg`    |

**PNG versions** are available in the same structure under `Png/` or `PNGs/` folders.

### Logo selection guide

- **Dark backgrounds** → White or Lime Green logo
- **Light backgrounds** → Black or Dark Green logo
- **Institutional/regulatory context** → Use Victrix + XP variant
- **Marketing/website** → Victrix solo (with or without "Capital")
- **Email footer, small sizes** → Horizontal variant with "Capital" inline

---

## Naming and Institutional Signature

- **Primary brand use:** Victrix Capital
- **Institutional use (when required):** Victrix Capital — Escritório credenciado à XP Investimentos
- **In body text, use:** "empresa de Assessoria de Investimentos" or "escritório credenciado à XP Investimentos"

### Allowed terminology

- Assessoria de Investimentos
- Assessor de Investimentos
- Escritório credenciado à XP Investimentos
- Produtos distribuídos pela XP, quando aplicável
- Abra sua conta

### Terminology to AVOID

- Financial institution / Financial services
- Wealth management
- Consultoria financeira
- Gestão de patrimônio
- Administração de recursos / de carteira
- Gestão de ativos

---

## Iconography

24 custom icons available in 3 color variants (Black, Green, DarkGreen).
Each icon is an SVG file following the naming pattern `NN_nome.svg`.

### Icon catalog

| #  | Name            | Concept                    |
|----|-----------------|----------------------------|
| 01 | crescimento     | Growth / upward trend      |
| 02 | barras          | Bar chart                  |
| 03 | moeda           | Currency / coin            |
| 04 | carteira        | Portfolio / wallet         |
| 05 | transferencia   | Transfer / exchange        |
| 06 | contrato        | Contract / document        |
| 07 | seguranca       | Security / lock            |
| 08 | equilibrio      | Balance / scales           |
| 09 | tempo           | Time / clock               |
| 10 | meta            | Target / goal              |
| 11 | ativoreal       | Real estate / real asset   |
| 12 | percentual      | Percentage                 |
| 13 | retorno         | Return / upward arrow      |
| 14 | global          | Globe / international      |
| 15 | locacao         | Allocation / pie chart     |
| 16 | diversificacao  | Diversification / drop     |
| 17 | liquidez        | Liquidity / downward arrow |
| 18 | risco           | Risk / downward trend      |
| 19 | acesso          | Access / search            |
| 20 | sinal           | Signal / radar             |
| 21 | analise         | Analysis / zoom            |
| 22 | ciclo           | Cycle / rotation           |
| 23 | fundos          | Funds / layers             |
| 24 | visao           | Vision / horizon           |

### Icon paths

```
assets/images/Icons/Black/NN_nome.svg     → Black stroke, for light backgrounds
assets/images/Icons/Green/0NN_nome.svg    → Lime Green (#88E833), for dark backgrounds
assets/images/Icons/DarkGreen/0NN_nome.svg → Deep Forest green, for light backgrounds
```

**Note:** Green and DarkGreen folders use zero-padded numbers (`01_`, `010_`),
Black folder uses unpadded (`1_`, `10_`). Check actual filenames when referencing.

### Icon presentation styles (from guidelines)

- **Outline on white** — clean, minimal (Black variant)
- **On dark rounded-square background** — Green or DarkGreen on `#0E1C0E` with rounded corners
- **On lime rounded-square background** — Black icons on `#88E833` with rounded corners

---

## Grafismos / Blur Backgrounds

Landscape photographs, heavily blurred, serve as backgrounds. The blur removes
drama, spectacle, and romanticism — expressing calm and lightness. Key visual
qualities: direction, mass, rhythm, ascension, flow.

### Available blur backgrounds

```
assets/images/blur_backgrounds/
├── Slide 16_9 - 65.png   → Verde/dourado natural — **preferred**
├── Slide 16_9 - 66.png   → Tons frios, azul/verde
├── Slide 16_9 - 67.png   → Azul/céu com transição quente
├── Slide 16_9 - 68.png   → Tons mistos, azul dominante
└── Slide 16_9 - 699.png  → Variante adicional
```

Always apply a dark overlay for legibility when used as backgrounds:

```python
# Overlay escuro — ajuste alpha conforme contexto:
# Tabelas: 0.60-0.72 | Gráficos: 0.65-0.75 | Website hero: 0.70-0.85
ax.add_patch(patches.Rectangle((0,0), 1, 1,
    transform=ax.transAxes,
    facecolor=hex_rgba('#0E1C0E', 0.68), edgecolor='none', zorder=1))
```

---

## Profile Photos

```
assets/images/Profile/
├── pngprofile01.png   → Professional headshot 1
├── pngprofile02.png   → Professional headshot 2
└── profile_blur.png   → Blurred version for backgrounds
```

---

## Other Image Assets

```
assets/images/
├── xp-branco.png      → XP logo (white version)
├── xp-preto.png       → XP logo (black version)
└── og-image.html      → Open Graph image template
```

---

## Table Design (Python/matplotlib)

Standard structure for financial data tables:

```
┌─────────────────────────┬──────────────────────────────────────┐
│ Mediana Focus  (BCB)    │  2026                                │
│                         │  Há 4 sem | Há 1 sem | Hoje | Comp. │
├─────────────────────────┼──────────────────────────────────────┤
│ IPCA (variação %)       │  3,91     │  4,17    │ 4,36 │  ▲    │
│ PIB (variação %)        │  1,82     │  1,85    │ 1,85 │  =    │
└─────────────────────────┴──────────────────────────────────────┘
│ [LOGO]                                                         │
└────────────────────────────────────────────────────────────────┘
```

**Key rules:**
- Header block: `MID_GRN` at 25% opacity (transparent, blur shows through)
- Year label ("2026"): `LIME`, `fp_xlight`, size 16
- Title ("Mediana Focus"): `WHITE`, `fp_bold`, size 11
- Subtitle ("(BCB)"): `LIME`, `fp_light`, size 9
- Column "Hoje": highlighted with `LIME` text + subtle `LIME` fill (alpha 0.09)
- Alternating rows: `#152615` (odd) and transparent (even)
- Values "Hoje": `LIME`, `fp_bold`, size 11
- Other values: `SAGE`, `fp_semi`, size 8.5
- Arrows ▲▼=: use system font (Zalando Sans does not have these glyphs)
  - ▲ = `LIME`, ▼ = `#C0392B`, = = `SAGE`
- Logo in footer: left-aligned, proportional height

---

## Chart Design (Python/matplotlib)

- Background: blur + overlay `#0E1C0E` at 72% opacity
- Primary series: `LIME`, `linewidth=2.8`
- Secondary series: `SAGE`, `linewidth=2.0`, `linestyle='--'`, alpha 0.85
- Last point: marker `'o'` + `ax.annotate` with formatted value (comma as decimal)
- Grid: `MID_GRN`, alpha 0.25 (y-axis), 0.12 (x-axis)
- Axis labels + ticks: `SAGE`, `fp_light`, size 8
- Title: `WHITE`, `fp_semi`, size 11
- Legend: `fp_semi`, size 9.5, facecolor `#0E1C0E` at 85%
- Spine edges: `MID_GRN` at 40%, linewidth 0.5

---

## Graphic Elements, Compositions and Proportions

Visual elements support typography, color, and identity. Each element was designed
to work together, with adjustable intensity per communication need. Composition
principles determine how each piece relates, ensuring harmony and visual coherence.

### Grid System

All compositions follow a modular grid visible in the guidelines. The base format
is **16:9** (1920×1080px for presentations and digital).

### Logo + XP Proportions (from guidelines page 8)

The Victrix wordmark and the XP badge are always separated by a vertical rule.
The XP badge is a rounded-corner square whose height matches the cap-height of
"VICTRIX". Visual proportions observed:

```
┌──────────────────────────────┬───────┐
│        VICTRIX               │ ▐ XP ▐│
│                              │       │
└──────────────────────────────┴───────┘
         ~82% width              ~18%
```

- XP badge height = cap-height of "VICTRIX" wordmark
- XP badge width ≈ 1:1 square (slightly wider for the "XP" text)
- Separator: thin vertical line, same color as wordmark
- The badge has rounded corners (~12% of badge height)
- Minimum clear space around the combined logo = height of the "X" in XP

### Composition Layouts (from guidelines pages 17–21)

The guidelines define **3 hierarchy levels** of composition, each with different
logo scale relative to the canvas:

#### Layout A — Full-bleed hero (page 17, top-left)
```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│          VICTRIX ▐XP▐                   │  ← Logo centered vertically,
│                                         │     occupies ~60% of canvas width
│                                         │
│                                         │
└─────────────────────────────────────────┘
```
- Logo: ~60% of canvas width, vertically centered or bottom-third
- Background: solid Deep Forest or blur with overlay
- No body text — hero/cover use only

#### Layout B — Institutional card (pages 19–21)
```
┌───────────────────┬─────────────────────┐
│                   │  Body text block     │  ← Right column: ~45% width
│   Lime Green      │  in Charcoal or      │
│   solid block     │  Lime Green on dark   │
│   (~55% width)    │                      │
│                   │                      │
├───────────────────┤                      │
│  VICTRIX ▐XP▐    │                      │  ← Logo: bottom-left of green block
│                   │                      │     ~30% of block width
└───────────────────┴─────────────────────┘
```
- Split: ~55% color block (left) / ~45% content (right)
- The color block can be: Lime Green, Deep Forest, or Mid Green
- Logo sits in the bottom-left of the color block at ~30% of block width
- Body text: top-right of content area, left-aligned
- Text on Lime Green: Charcoal (#262626)
- Text on Deep Forest: Sage (#D5DAD0) or Lime Green (#88E833)

#### Layout C — White institutional page (page 20)
```
┌─────────────────────────────────────────────────────────┐
│ VICTRIX ▐XP▐                          www.victrixcapital.com │
│                                                         │
│                                                         │
│              Body text block                            │
│              (~50% width, centered-right)               │
│                                                         │
│                                                         │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← Blur strip: bottom ~20%
└─────────────────────────────────────────────────────────┘
```
- White background
- Logo: top-left, small (~8–10% of canvas width) + XP badge
- URL: top-right, Regular weight, Charcoal
- Body text: center-right, ~50% width
- Blur background strip: bottom ~20% of canvas, edge-to-edge
- Thin colored bar (Lime Green) can separate white from blur

#### Layout D — Pilares/valores card (page 23)
```
┌──────────────────┬────────┬───────────────────────────┐
│ VICTRIX ▐XP▐     │        │         www.victrixcapital.com │
│                  │        │                           │
│  • Bullet text   │ [icon] │  **Pilar title**          │
│    block, left   │  64px  │  Description text         │
│    ~30% width    │ rounded│  in Regular weight        │
│                  │ square │                           │
│  • Next bullet   │ [icon] │  **Pilar title**          │
│                  │        │  Description text         │
│                  │        │                           │
│  • Next bullet   │ [icon] │  **Pilar title**          │
│                  │        │  Description text         │
└──────────────────┴────────┴───────────────────────────┘
```
- Background: Mid Green (#2E6F3A) with blur overlay in bottom portion
- 3-column structure: bullets (~30%) | icons (~10%) | pilar text (~40%)
- Icons: on Dark rounded squares (~64×64px), Lime Green stroke
- Pilar titles: Bold, Charcoal or White depending on background
- URL: top-right corner

### Icon Presentation in Cards

Icons in card layouts are presented inside rounded-corner squares:

```css
/* Dark variant (on Mid Green / Deep Forest backgrounds) */
.icon-container-dark {
  width: 64px;
  height: 64px;
  background: #0E1C0E;
  border-radius: 12px;  /* ~18% of size */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
}
/* Icon stroke: #88E833 (Lime Green) */

/* Light variant (on white / Lime Green backgrounds) */
.icon-container-light {
  width: 64px;
  height: 64px;
  background: #88E833;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
}
/* Icon stroke: #262626 (Charcoal) or #0E1C0E (Deep Forest) */
```

---

## LinkedIn Content Templates (from guidelines page 27–28)

Three main formats, all following the grid system:

### 1. Text post (dark) — ~4:5 portrait ratio
```
┌─────────────────────────────────┐
│                                 │
│  **Title line, Bold,**          │  ← White or Sage text
│  **second line if needed.**     │
│                                 │
│  Body text in Regular weight,   │  ← Sage (#D5DAD0)
│  paragraph format. Can extend   │
│  to several paragraphs.         │
│                                 │
│  Second paragraph continues     │
│  below with same styling.       │
│                                 │
│                                 │
│              VICTRIX ▐XP▐       │  ← Logo bottom-right, ~20% width
└─────────────────────────────────┘
```
- Background: Deep Forest (#0E1C0E)
- Title: White, Bold, ~18–22px
- Body: Sage (#D5DAD0), Regular, ~14–16px
- Logo: bottom-right, ~20% of card width
- Padding: ~8% from all edges
- No imagery, text only

### 2. Blog/article card — ~4:5 portrait ratio
```
┌─────────────────────────────────┐
│                                 │
│  **Title line, Bold,**          │  ← Charcoal text
│  **second line.**               │
│                                 │
│  "Veja em:"                     │  ← Small, Light weight
│  **blog.victrix.com.br**        │  ← Bold, Charcoal
│                                 │
│  Body text in Regular weight.   │
│  Can be a summary or excerpt.   │
│                                 │
│                                 │
│ ░░░░░░░░░  VICTRIX ▐XP▐        │  ← Blur strip bottom, logo over it
└─────────────────────────────────┘
```
- Background: White
- Title: Charcoal, Bold, left-aligned
- Blog reference: "Veja em:" in Light + URL in Bold
- Body: Charcoal, Regular
- Bottom strip: blur background (~25% height) with logo overlaid
- Logo: bottom-right of blur strip, ~15% of card width

### 3. Profile card — ~3:4 portrait ratio
```
┌─────────────────────────────────┐
│ VICTRIX ▐XP▐                   │  ← Lime Green header bar, ~5% height
├─────────────────────────────────┤
│                                 │
│                                 │
│         [Professional           │  ← Photo: centered, ~80% of card width
│          headshot photo]        │
│                                 │
│                                 │
├─────────────────────────────────┤
│ Name                    Role    │  ← Footer bar: Lime Green background
└─────────────────────────────────┘     Charcoal text, SemiBold
```
- Header bar: Lime Green (#88E833), logo in Charcoal/Black, left-aligned
- Photo area: full-width, no padding, occupies ~85% of card height
- Footer bar: Lime Green, name left-aligned (SemiBold), role right-aligned (Regular)
- All text on Lime Green: Charcoal (#262626)

---

## Email Template

```
Subject: Victrix Capital — [Report Name] | DD/MM/YYYY
From: z.cassiolato@gmail.com
To: (sender — visible)
BCC: all recipients

Body (HTML):
  background: #0E1C0E
  text: #D5DAD0, 'Zalando Sans SemiExpanded', Arial, sans-serif, 13px
  accent: #88E833 (bold highlights)
  footer: "Victrix Capital" in #2E6F3A

Images: inline via cid:, max-width 600px
```

---

## Number Formatting (Brazilian Portuguese)

```python
def fmt(valor, decimais=2) -> str:
    if valor is None:
        return "-"
    return f"{valor:,.{decimais}f}".replace(",","X").replace(".","," ).replace("X",".")
# 1234.56 → "1.234,56"
# 4.36    → "4,36"
```

---

## Brand Voice

- **Precise**: numbers always formatted, no rounding without disclosure
- **Calm**: no exclamation marks, no dramatic language
- **Modern**: clean layouts, no decorative elements, no shadows or glows
- **Institutional**: CFA/investment banking level standards
- **No spectacle**: blur backgrounds remove drama; text is matter-of-fact
- **No romanticism**: avoid metaphors about "journeys", "dreams", "conquering"

---

## Helper Function

```python
def hex_rgba(h, a):
    h = h.lstrip('#')
    r, g, b = tuple(int(h[i:i+2], 16)/255 for i in (0, 2, 4))
    return (r, g, b, a)
```

---

## Assets Quick Reference (site_victrix project)

```
assets/
├── css/
│   ├── style.css                  ← Main site stylesheet
│   ├── zalando-sans.css           ← Font-face declarations
│   └── victrix-logos.css          ← Logo styling
├── js/
│   └── main.js                   ← Main site JavaScript
├── fonts/
│   ├── static/                   ← All weight variants (.ttf)
│   └── *VariableFont*.ttf        ← Variable font files
├── images/
│   ├── Icons/
│   │   ├── Black/                ← 24 icons, black stroke
│   │   ├── Green/                ← 24 icons, lime green
│   │   └── DarkGreen/            ← 24 icons, dark green
│   ├── Logos/
│   │   ├── Logo_sem_XP/          ← Victrix solo (SVG vectors)
│   │   └── Logo_Victrix_XP/      ← Victrix + XP (black/darkgreen/green/white)
│   ├── Profile/                  ← Team photos
│   ├── blur_backgrounds/         ← 5 blur background images
│   ├── xp-branco.png             ← XP logo white
│   └── xp-preto.png              ← XP logo black
└── VictrixCapital_guidelines_v01.pdf ← Official brand guidelines
```

---

## CSS Variables (for web implementations)

```css
:root {
  --lime: #88E833;
  --deep-forest: #0E1C0E;
  --charcoal: #262626;
  --mid-green: #2E6F3A;
  --sage: #D5DAD0;
  --white: #FFFFFF;
  --alt-row: #152615;
  --red: #C0392B;
  --font-primary: 'Zalando Sans SemiExpanded', sans-serif;
}
```
