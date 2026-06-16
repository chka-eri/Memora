/**
 * Memora — Design System
 *
 * Logo reference: glowing indigo brain, electric-cyan neural nodes,
 * central lightbulb, soft violet accents, deep-space dark background.
 *
 * Use COLORS for programmatic StyleSheet values.
 * Use className with Tailwind for NativeWind-powered components.
 */

// ─── Raw Palette ────────────────────────────────────────────────────────────

export const PALETTE = {
  // Brand family — logo-derived
  indigo: {
    900: '#1E1B6A',
    800: '#2D2A8A',
    700: '#3730A3',
    600: '#4338CA',
    500: '#4F46E5',
    400: '#6366F1',
    300: '#818CF8',
    200: '#A5B4FC',
    100: '#C7D2FE',
    50:  '#EEF2FF',
  },
  cyan: {
    700: '#0E7490',
    600: '#0891B2',
    500: '#06B6D4',
    400: '#22D3EE',
    300: '#67E8F9',
    glow: '#00E5FF',
  },
  violet: {
    800: '#4C1D95',
    700: '#5B21B6',
    600: '#7C3AED',
    500: '#8B5CF6',
    400: '#A78BFA',
    soft: '#7B61FF',
    light: '#C4B5FD',
  },

  // Neutral — dark, blue-shifted
  navy: {
    1000: '#03030A',
    950:  '#06060F',
    900:  '#0D0D22',
    800:  '#111130',
    750:  '#14143A',
    700:  '#17173A',
    600:  '#1E1E48',
    500:  '#252558',
    400:  '#333370',
    300:  '#48488A',
    200:  '#7070A8',
    100:  '#A0A0C8',
  },

  // Neutral — light, violet-shifted
  lavender: {
    50:  '#F8F7FF',
    100: '#EEEEFF',
    200: '#E0DEFF',
    300: '#C8C4FF',
    400: '#A5A0FF',
    500: '#8888DD',
    600: '#6060BB',
  },

  // Status
  teal:   { 500: '#00E5A0', 400: '#00C9A8' },
  gold:   { 500: '#FFD166', 400: '#EDB950' },
  rose:   { 500: '#FF4466', 400: '#FF2244' },

  // Pure
  white: '#FFFFFF',
  black: '#000000',
} as const;


// ─── Semantic Color Tokens ───────────────────────────────────────────────────

export const COLORS = {
  dark: {
    // Backgrounds
    bg:            '#06060F',
    bgAlt:         '#0D0D22',
    card:          '#111130',
    surface:       '#17173A',
    overlay:       'rgba(6,6,15,0.80)',

    // Borders
    border:        '#252558',
    borderLit:     '#333370',
    borderAccent:  '#3730A3',

    // Brand
    primary:       '#6366F1',
    primaryDeep:   '#4338CA',
    primaryGlow:   'rgba(99,102,241,0.22)',
    cyan:          '#06B6D4',
    cyanGlow:      '#00E5FF',
    cyanOverlay:   'rgba(6,182,212,0.20)',
    violet:        '#7B61FF',
    violetLit:     '#A78BFA',
    violetOverlay: 'rgba(123,97,255,0.18)',
    purple:        '#7C3AED',

    // Text
    text:          '#F0EFFF',
    textSub:       '#A0A0C8',
    textMuted:     '#48488A',
    textAccent:    '#818CF8',

    // Status
    success:       '#00E5A0',
    gold:          '#FFD166',
    danger:        '#FF4466',

    // Mnemonic type accents
    acronym:       '#6366F1',
    story:         '#7B61FF',
    rhyme:         '#FFD166',
    palace:        '#00E5A0',
  },

  light: {
    // Backgrounds
    bg:            '#F8F7FF',
    bgAlt:         '#EEEEFF',
    card:          '#FFFFFF',
    surface:       '#EEEEFF',
    overlay:       'rgba(13,13,31,0.55)',

    // Borders
    border:        '#E0DEFF',
    borderLit:     '#A5A0FF',
    borderAccent:  '#6366F1',

    // Brand
    primary:       '#4338CA',
    primaryDeep:   '#3730A3',
    primaryGlow:   'rgba(67,56,202,0.14)',
    cyan:          '#0891B2',
    cyanGlow:      '#06B6D4',
    cyanOverlay:   'rgba(8,145,178,0.10)',
    violet:        '#4F46E5',
    violetLit:     '#6366F1',
    violetOverlay: 'rgba(79,70,229,0.10)',
    purple:        '#7C3AED',

    // Text
    text:          '#0D0D22',
    textSub:       '#505080',
    textMuted:     '#A0A0C0',
    textAccent:    '#4338CA',

    // Status
    success:       '#00C9A8',
    gold:          '#EDB950',
    danger:        '#FF2244',

    // Mnemonic type accents
    acronym:       '#4F46E5',
    story:         '#7C3AED',
    rhyme:         '#EDB950',
    palace:        '#00C9A8',
  },
} as const;

export type ThemeColors = typeof COLORS.dark | typeof COLORS.light;


// ─── Spacing ─────────────────────────────────────────────────────────────────

export const SPACING = {
  '0':    0,
  px:     1,
  '0.5':  2,
  '1':    4,
  '1.5':  6,
  '2':    8,
  '2.5':  10,
  '3':    12,
  '3.5':  14,
  '4':    16,
  '4.5':  18,
  '5':    20,
  '6':    24,
  '7':    28,
  '8':    32,
  '9':    36,
  '10':   40,
  '12':   48,
  '14':   56,
  '16':   64,
  '20':   80,
} as const;


// ─── Border Radius ────────────────────────────────────────────────────────────

export const RADIUS = {
  none:  0,
  sm:    6,
  md:    10,
  base:  12,
  lg:    16,
  xl:    20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  full:  9999,
} as const;


// ─── Typography ───────────────────────────────────────────────────────────────

export const FONT_SIZE = {
  '2xs': 10,
  xs:    12,
  sm:    14,
  base:  16,
  lg:    18,
  xl:    20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 34,
  '5xl': 42,
} as const;

export const LINE_HEIGHT = {
  '2xs': 14,
  xs:    16,
  sm:    20,
  base:  24,
  lg:    26,
  xl:    28,
  '2xl': 32,
  '3xl': 36,
  '4xl': 42,
  '5xl': 52,
} as const;

export const FONT_WEIGHT = {
  regular:   '400' as const,
  medium:    '500' as const,
  semibold:  '600' as const,
  bold:      '700' as const,
  extrabold: '800' as const,
  black:     '900' as const,
};

export const LETTER_SPACING = {
  tight:   -0.5,
  normal:   0,
  wide:     0.5,
  wider:    1,
  caps:     1.2,
} as const;


// ─── Shadows & Glow ──────────────────────────────────────────────────────────

export const SHADOWS = {
  dark: {
    card: {
      shadowColor:   '#03030A',
      shadowOffset:  { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius:  12,
      elevation:     8,
    },
    glowPrimary: {
      shadowColor:   '#6366F1',
      shadowOffset:  { width: 0, height: 0 },
      shadowOpacity: 0.55,
      shadowRadius:  20,
      elevation:     16,
    },
    glowCyan: {
      shadowColor:   '#00E5FF',
      shadowOffset:  { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius:  18,
      elevation:     14,
    },
    glowViolet: {
      shadowColor:   '#7B61FF',
      shadowOffset:  { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius:  16,
      elevation:     12,
    },
    glowGold: {
      shadowColor:   '#FFD166',
      shadowOffset:  { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius:  14,
      elevation:     10,
    },
    glowTeal: {
      shadowColor:   '#00E5A0',
      shadowOffset:  { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius:  14,
      elevation:     10,
    },
    float: {
      shadowColor:   '#4338CA',
      shadowOffset:  { width: 0, height: 8 },
      shadowOpacity: 0.45,
      shadowRadius:  20,
      elevation:     20,
    },
  },

  light: {
    card: {
      shadowColor:   '#4338CA',
      shadowOffset:  { width: 0, height: 4 },
      shadowOpacity: 0.10,
      shadowRadius:  12,
      elevation:     5,
    },
    glowPrimary: {
      shadowColor:   '#4F46E5',
      shadowOffset:  { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius:  14,
      elevation:     8,
    },
    glowCyan: {
      shadowColor:   '#0891B2',
      shadowOffset:  { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius:  12,
      elevation:     8,
    },
    glowViolet: {
      shadowColor:   '#7C3AED',
      shadowOffset:  { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius:  12,
      elevation:     6,
    },
    glowGold: {
      shadowColor:   '#EDB950',
      shadowOffset:  { width: 0, height: 4 },
      shadowOpacity: 0.20,
      shadowRadius:  10,
      elevation:     6,
    },
    glowTeal: {
      shadowColor:   '#00C9A8',
      shadowOffset:  { width: 0, height: 4 },
      shadowOpacity: 0.20,
      shadowRadius:  10,
      elevation:     6,
    },
    float: {
      shadowColor:   '#4F46E5',
      shadowOffset:  { width: 0, height: 6 },
      shadowOpacity: 0.22,
      shadowRadius:  16,
      elevation:     12,
    },
  },
} as const;


// ─── Mnemonic Type Config ─────────────────────────────────────────────────────

export const MNEMONIC_CONFIG = {
  acronym: {
    emoji:    '🔤',
    label:    'Acronym',
    darkHex:  '#6366F1',
    lightHex: '#4F46E5',
  },
  story: {
    emoji:    '📖',
    label:    'Silly Story',
    darkHex:  '#7B61FF',
    lightHex: '#7C3AED',
  },
  rhyme: {
    emoji:    '🎵',
    label:    'Rhyme Chain',
    darkHex:  '#FFD166',
    lightHex: '#EDB950',
  },
  palace: {
    emoji:    '🏛️',
    label:    'Memory Palace',
    darkHex:  '#00E5A0',
    lightHex: '#00C9A8',
  },
} as const;

export type MnemonicType = keyof typeof MNEMONIC_CONFIG;


// ─── Reusable NativeWind className strings ───────────────────────────────────
// Pre-composed Tailwind class strings for repeated patterns.

export const TW = {
  // Full-screen container
  screen:
    'flex-1 bg-light-bg dark:bg-dark-bg',

  // Floating card
  card:
    'bg-light-card dark:bg-dark-card ' +
    'border border-light-border dark:border-dark-border ' +
    'rounded-2xl p-4',

  // Section label
  sectionLabel:
    'text-xs font-bold tracking-caps uppercase ' +
    'text-ink-inv-muted dark:text-ink-muted mb-2.5',

  // Display heading
  heading:
    'text-3xl font-extrabold tracking-tight ' +
    'text-ink-inv dark:text-ink-primary',

  // Body text
  body:
    'text-base font-normal ' +
    'text-ink-inv dark:text-ink-primary',

  // Helper / subtitle text
  subtitle:
    'text-sm font-medium ' +
    'text-ink-inv-sub dark:text-ink-secondary',

  // Muted text
  muted:
    'text-xs font-normal ' +
    'text-ink-inv-muted dark:text-ink-muted',

  // Input field
  input:
    'bg-light-surface dark:bg-dark-surface ' +
    'border border-light-border dark:border-dark-border ' +
    'rounded-xl px-4 py-3.5 text-base ' +
    'text-ink-inv dark:text-ink-primary',

  // Pill / chip
  pill:
    'bg-light-surface dark:bg-dark-surface ' +
    'border border-light-border dark:border-dark-border ' +
    'rounded-lg px-2.5 py-1',

  // Tab inactive
  tabInactive:
    'flex-row items-center gap-1.5 ' +
    'bg-light-card dark:bg-dark-card ' +
    'border border-light-border dark:border-dark-border ' +
    'rounded-full px-3.5 py-2',

  // Tab active
  tabActive:
    'flex-row items-center gap-1.5 ' +
    'bg-brand-indigo-mid border border-brand-indigo-mid ' +
    'rounded-full px-3.5 py-2',

  // Horizontal divider
  divider:
    'h-px bg-light-border dark:bg-dark-border my-4',

  // Page header bar
  header:
    'flex-row items-center justify-between ' +
    'px-4 py-3.5 ' +
    'border-b border-light-border dark:border-dark-border ' +
    'bg-light-bg dark:bg-dark-bg',

  // Small circular icon button
  iconBtn:
    'w-10 h-10 rounded-full items-center justify-center ' +
    'bg-light-surface dark:bg-dark-surface ' +
    'border border-light-border dark:border-dark-border',
} as const;
