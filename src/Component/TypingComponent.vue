<template>
  <div id="typed-output"></div>
</template>

<script>
import Typed from 'typed.js';

export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true, // id prop 추가
    },
  },
  mounted() {
    const element = document.getElementById(this.id); // 동적으로 받은 id로 타겟

    if (element) {
      const options = {
        strings: [this.message],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1500,
        loop: true,
      };
      // new Typed('#typed-output', options);
      new Typed(`#${this.id}`, options); // 동적으로 받은 id 사용
    } else {
      console.error('#typed-output element not found!');
    }
  },
};
</script>

<style scoped>
/* Scoped 스타일을 사용하지 않으면 Tailwind 클래스를 템플릿에 직접 적용해도 됩니다 */
#typed-output {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bolder;
  font-size: 40px;
  color: #333;
  margin-top: 20px;
}
</style>
