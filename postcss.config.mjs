const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  theme: {
    extend: {
      fontFamily: {
        // This sets the default "font-sans" to Outfit
        sans: ["Outfit", "sans-serif"],
      },
    },
  },
  clash: ["clashdisplay", "sans-serif"],
};

export default config;
