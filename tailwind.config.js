/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {    
      colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'DarkBlue': '#49c6e5',
      'LightBlue': '#54defd',
      'Whi': '#fffbfa',
      'Emerald': '#00bd9d',
      'LightEmerald': '#8bd7d2',
      'silver': '#ecebff',

      'DarkPurple': '#9381FF',
      'LightPurple': '#B8B8FF',
      'BoneWhite': '#F8F7FF',
      'Beige': '#FFEEDD',
      'Apricot': '#FFD8BE',

    }},
  },
  plugins: [],
}

