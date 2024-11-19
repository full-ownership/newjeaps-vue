import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

// AOS 추가
import AOS from 'aos';
import 'aos/dist/aos.css';

// Kakao API 초기화
import { useKakao } from 'vue3-kakao-maps/@utils';

// Kakao API 초기화
useKakao("6968378f2f6b7f841d023ce674b9b307");

// Vue-Typer 플러그인 임포트
import VueTyperPlugin from 'vue-typer';

// 애플리케이션 생성
const app = createApp(App);

// Pinia, 라우터 사용
app.use(createPinia());
app.use(router);

// AOS 초기화(스크롤 이벤트)
app.mixin({
  mounted() {
    AOS.init({
      duration: 800, // 애니메이션 지속 시간
      easing: 'ease-in-out', // 애니메이션 속도
      once: true, // 스크롤 시 한 번만 실행
    });
  },
});

// Vue-Typer 플러그인 사용
app.use(VueTyperPlugin);

// 애플리케이션 마운트
app.mount('#app');
