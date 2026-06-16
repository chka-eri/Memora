/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],

  // Uses system color-scheme — no root-class toggling needed
  darkMode: 'media',

  theme: {
    extend: {
      // ─── Brand Palette ────────────────────────────────────────────────
      // Derived from the logo: indigo-body → electric-cyan glow → violet accent
      colors: {
        brand: {
          indigo:       '#4338CA', // deep logo indigo
          'indigo-mid': '#6366F1', // mid-range indigo (primary buttons)
          'indigo-lit': '#818CF8', // soft highlight indigo
          cyan:         '#06B6D4', // neural-node cyan
          'cyan-glow':  '#00E5FF', // pure electric glow
          'cyan-dim':   '#0891B2', // toned cyan for light mode
          violet:       '#7B61FF', // accent violet (mnemonics, badges)
          'violet-lit': '#A78BFA', // light violet tint
          purple:       '#7C3AED', // deep purple undertone
          'purple-lit': '#9D6FE8', // soft purple
        },

        // ─── Dark mode surfaces ────────────────────────────────────────
        dark: {
          bg:           '#06060F', // near-black, blue-tinted void
          'bg-alt':     '#0D0D22', // slightly elevated background
          card:         '#111130', // card / modal surface
          surface:      '#17173A', // input fields, hover states
          border:       '#252558', // default border
          'border-lit': '#3B3B8A', // highlighted / focused border
          overlay:      'rgba(6,6,15,0.75)',
        },

        // ─── Light mode surfaces ───────────────────────────────────────
        light: {
          bg:           '#F8F7FF', // cool off-white
          'bg-alt':     '#EEEEFF', // slightly tinted
          card:         '#FFFFFF',
          surface:      '#F0EFFF', // gentle violet blush
          border:       '#DDD8FF',
          'border-lit': '#A5A0FF',
          overlay:      'rgba(13,13,31,0.5)',
        },

        // ─── Ink (text) tokens ─────────────────────────────────────────
        ink: {
          // Dark mode text
          primary:   '#F0EFFF',
          secondary: '#9090C0',
          muted:     '#4A4A80',
          // Light mode text (use as dark:text-ink-* inverses)
          inv:       '#0D0D1F',
          'inv-sub': '#50508A',
          'inv-muted':'#A0A0C0',
        },

        // ─── Status / accent ───────────────────────────────────────────
        status: {
          success:  '#00E5A0',
          gold:     '#FFD166',
          danger:   '#FF4466',
          'success-lit': '#00C9A8',
          'gold-lit':    '#EDB950',
          'danger-lit':  '#FF2244',
        },
      },

      // ─── Typography ───────────────────────────────────────────────────
      fontFamily: {
        sans: ['System'],
        mono: ['Courier New'],
      },

      fontSize: {
        '2xs': ['10px', { lineHeight: '14px', letterSpacing: '0.4px' }],
        xs:    ['12px', { lineHeight: '16px', letterSpacing: '0.3px' }],
        sm:    ['14px', { lineHeight: '20px', letterSpacing: '0.2px' }],
        base:  ['16px', { lineHeight: '24px', letterSpacing: '0.1px' }],
        lg:    ['18px', { lineHeight: '26px', letterSpacing: '0px' }],
        xl:    ['20px', { lineHeight: '28px', letterSpacing: '-0.1px' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.3px' }],
        '3xl': ['28px', { lineHeight: '36px', letterSpacing: '-0.5px' }],
        '4xl': ['34px', { lineHeight: '42px', letterSpacing: '-0.8px' }],
        '5xl': ['42px', { lineHeight: '52px', letterSpacing: '-1px' }],
      },

      fontWeight: {
        thin:       '100',
        light:      '300',
        normal:     '400',
        medium:     '500',
        semibold:   '600',
        bold:       '700',
        extrabold:  '800',
        black:      '900',
      },

      letterSpacing: {
        tightest: '-0.05em',
        tighter:  '-0.025em',
        tight:    '-0.01em',
        normal:   '0em',
        wide:     '0.025em',
        wider:    '0.05em',
        widest:   '0.1em',
        caps:     '0.08em',
      },

      // ─── Spacing ──────────────────────────────────────────────────────
      spacing: {
        '4.5': '18px',
        '13':  '52px',
        '15':  '60px',
        '17':  '68px',
        '18':  '72px',
        '22':  '88px',
        '26':  '104px',
        '30':  '120px',
      },

      // ─── Border Radius ────────────────────────────────────────────────
      borderRadius: {
        none:   '0px',
        sm:     '6px',
        DEFAULT:'10px',
        md:     '12px',
        lg:     '16px',
        xl:     '20px',
        '2xl':  '24px',
        '3xl':  '28px',
        '4xl':  '32px',
        '5xl':  '40px',
        full:   '9999px',
      },

      // ─── Border Width ─────────────────────────────────────────────────
      borderWidth: {
        DEFAULT: '1px',
        0:       '0px',
        1:       '1px',
        1.5:     '1.5px',
        2:       '2px',
        3:       '3px',
      },

      // ─── Opacity ──────────────────────────────────────────────────────
      opacity: {
        0:   '0',
        5:   '0.05',
        10:  '0.1',
        15:  '0.15',
        20:  '0.2',
        30:  '0.3',
        40:  '0.4',
        50:  '0.5',
        60:  '0.6',
        70:  '0.7',
        80:  '0.8',
        90:  '0.9',
        95:  '0.95',
        100: '1',
      },

      // ─── Box Shadow (maps to RN elevation + shadows on iOS) ───────────
      boxShadow: {
        none:         'none',
        sm:           '0 2px 8px rgba(6,6,15,0.3)',
        DEFAULT:      '0 4px 16px rgba(6,6,15,0.4)',
        md:           '0 6px 20px rgba(6,6,15,0.45)',
        lg:           '0 8px 32px rgba(6,6,15,0.5)',
        xl:           '0 12px 48px rgba(6,6,15,0.6)',
        // Glow variants — logo color family
        'glow-sm':    '0 0 8px rgba(99,102,241,0.45)',
        'glow':       '0 0 18px rgba(99,102,241,0.6)',
        'glow-lg':    '0 0 32px rgba(99,102,241,0.7)',
        'glow-xl':    '0 0 56px rgba(99,102,241,0.75)',
        'glow-cyan':  '0 0 18px rgba(6,182,212,0.6)',
        'glow-cyan-lg':'0 0 32px rgba(6,182,212,0.7)',
        'glow-violet':'0 0 14px rgba(123,97,255,0.55)',
        'glow-gold':  '0 0 14px rgba(255,209,102,0.5)',
        'glow-teal':  '0 0 14px rgba(0,229,160,0.5)',
        'inner':      'inset 0 2px 8px rgba(6,6,15,0.5)',
      },

      // ─── Custom sizes ─────────────────────────────────────────────────
      width: {
        '4.5':  '18px',
        '13':   '52px',
        '15':   '60px',
        '18':   '72px',
        '22':   '88px',
      },
      height: {
        '4.5':  '18px',
        '13':   '52px',
        '15':   '60px',
        '18':   '72px',
        '22':   '88px',
      },

      // ─── Scale / transforms ───────────────────────────────────────────
      scale: {
        97: '0.97',
        98: '0.98',
        102: '1.02',
        103: '1.03',
      },
    },
  },

  plugins: [],
};
