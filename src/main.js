import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

// AOS 추가



// Kakao API 초기화
import { useKakao } from 'vue3-kakao-maps/@utils';


useKakao("6968378f2f6b7f841d023ce674b9b307");



// main.js
import $ from 'jquery'; // jQuery 가져오기


// jQuery를 전역에 추가 (필요할 경우)
window.$ = $;
window.jQuery = $;


// 애플리케이션 생성
const app = createApp(App);

// Pinia, 라우터 사용
app.use(createPinia());
app.use(router);

// AOS 초기화(스크롤 이벤트)
app.mixin({
 
});

// Vue-Typer 플러그인 사용


// 애플리케이션 마운트
app.mount('#app');
