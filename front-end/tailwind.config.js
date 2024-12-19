/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ // zoals in labos
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/index.tsx',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      'darkgreen': '#228b22',
      'lightgreen': '#22c55e',
      'whitesmoke': '#f5f5f5',
      'lightgray': '#e7e7e7',
      'mediumgray': '#d4d4d4',
      'red': '#ff0000',
    },
  },
  plugins: [],
};

