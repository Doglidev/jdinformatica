import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:         '#0A0E16',
        surface:    '#111827',
        accent:     '#F5C518',
        accent2:    '#E8B000',
        'jd-text':  '#EEEEF0',
        muted:      '#8B8FA0',
        'jd-border':'#1F2D42',
        success:    '#22C55E',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
