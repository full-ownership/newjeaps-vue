import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://211.117.197.184:70', // 첫 번째 서버 주소
        changeOrigin: true,
        secure: true,  // https 사용하지 않는 경우 false로 설정
        rewrite: (path) => path.replace(/^\/api/, ''), // 프록시 경로를 적절히 수정
      },
      // 추가적인 프록시 설정이 필요하면 아래와 같이 작성할 수 있습니다.
  
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
