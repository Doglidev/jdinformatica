import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D1117',
        surface: '#1A2744',
        accent: '#F5C518',
        'jd-text': '#F0F0F0',
        muted: '#8A8FA0',
        'jd-border': '#2E3A52',
        success: '#22C55E',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
