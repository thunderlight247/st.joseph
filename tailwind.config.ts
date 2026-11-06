import type { Config } from 'tailwindcss';

// Palette: deep indigo-navy (trust), medical cyan (clinical clarity), mist (calm surface),
// candle gold (warmth, used ONLY on the donation section), alert red (emergencies only).
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B2545',
        tide: '#0E7C99',
        mist: '#EDF5F8',
        candle: '#E8B04A',
        alert: '#B42318',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
