module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // 'purge' 대신 'content' 사용
  darkMode: 'media', // 'false' 대신 'media'로 설정 (또는 이 줄을 아예 제거 가능)
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ["Pretendard"],
        PretendardRegular: ["Pretendard Regular"],
        PretendardSemiBold: ["Pretendard SemiBold"],
        PretendardBold: ["Pretendard Bold"],
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
