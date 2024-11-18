
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
    extend: {
      fontFamily: {
	      Pretendard: ["Pretendard"],
        PretendardRegular: ["Pretendard Regular"],
        PretendardSemiBold: ["Pretendard SemiBold"],
	    },
      fontSize: {
        'xxs': '0.65rem', // 10px
      },
    },
  },
   variants: {
     extend: {},
   },
   plugins: [],
 }
