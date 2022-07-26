import plugin from 'tailwindcss/plugin';
import { defineConfig } from 'windicss/helpers';
import formsPlugin from 'windicss/plugin/forms';

export default defineConfig({
  theme: {
    extend: {

    },
  },
  extract: {
    include: ['src/**/*.{html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  plugins: [
    formsPlugin,
    plugin(({ addUtilities }) => {
      const newUtilities = {

      };

      addUtilities(newUtilities);

    }),
    plugin(({ }) => { })
  ],
})
