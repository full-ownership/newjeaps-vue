<template>
  <div id="fullpage">
    <!-- 첫 번째 섹션 -->
    <div class="section flex flex-col h-[100vh]" id="section1">
      <Introduction1></Introduction1>
      <Mouse></Mouse>
    </div>
    <!-- 두 번째 섹션 -->
    <div class="section" id="section2">
      <Introduction2></Introduction2>

    </div>

    <!-- 세 번째 섹션 -->
    <div class="section" id="section3">
      <div class="section-inner">
        <h1 class="ani-03">Section 3</h1>
      </div>
    </div>

    <!-- 추가 섹션들 -->
    <div class="section" id="section4">
      <div class="section-inner">
        <h1>Section 4</h1>
      </div>
    </div>
    <div class="section" id="section5">
      <div class="section-inner">
        <h1>Section 5</h1>
      </div>
    </div>
    <div class="section" id="section6">
      <div class="section-inner">
        <h1>Section 6</h1>
      </div>
    </div>
  </div>

  <!-- 페이지 메뉴 -->
  <ul id="pageMenu" class="flex flex-col">
    <li><a href="#section1"><span></span><i></i></a></li>
    <li><a href="#section2"><span></span><i></i></a></li>
    <li><a href="#section3"><span></span><i></i></a></li>
    <li><a href="#section4"><span></span><i></i></a></li>
    <li><a href="#section5"><span></span><i></i></a></li>
    <li><a href="#section6"><span></span><i></i></a></li>
  </ul>
</template>

<script setup>
import { onMounted } from 'vue';
import Mouse from '@/Component/Mouse.vue';
import Introduction1 from '@/Component/Introduction/Introduction1.vue';
import Introduction2 from '@/Component/Introduction/Introduction2.vue';
import $ from 'jquery';

let isScrolling = false; // 스크롤 중인지 여부

onMounted(() => {
  // fullpage.js 초기화
  // 스크롤 위치에 따라 자동으로 섹션 이동
  // 스크롤 애니메이션 함수
  function scrollToSection(sectionId) {
    if (isScrolling) return; // 이미 스크롤 중이면 함수 종료

    isScrolling = true; // 스크롤 시작

    // id로 지정된 섹션으로 부드럽게 스크롤
    $('html, body').animate({
        scrollTop: $(sectionId).offset().top
    }, 780, () => {
        isScrolling = false; // 스크롤 애니메이션 완료 후 isScrolling을 false로 설정
    });
  }

  window.addEventListener('scroll', () => {

    if (isScrolling) return; // 스크롤 애니메이션 중에는 처리하지 않음

    console.log("스크롤 동작")
    const scrollPosition = window.scrollY;
    console.log(scrollPosition)
    // 예를 들어, 1000px 이상 스크롤하면 section2로 이동
    if (scrollPosition > 150 && scrollPosition < 400) {
         // id가 'targetSection'인 곳으로 스크롤
         scrollToSection('#section2'); // section2로 스크롤=
    } else if (scrollPosition > 2000 && scrollPosition < 3000) {
      //$.fn.fullpage.moveTo('section3');
    }
    // 추가 조건을 더 설정하여 다른 섹션으로 이동할 수 있습니다.
  });


});
</script>

<style scoped>
#fullpage {
  height: 100vh;
}

.section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  background-color: #000f63;
}

#section1 { background-color: #ffffff; }
#section2 { background-color: #250066; }
#section3 { background-color: #43004e; }
#section4 { background-color: #630021; }
#section5 { background-color: #5f0600; }
#section6 { background-color: black; }

.section-inner {
  text-align: center;
}

.ani-01, .ani-02, .ani-03 {
  font-size: 40px;
  font-weight: bold;
  opacity: 0;
  animation: fadeIn 1s forwards;
}

.ani-02 { animation-delay: 0.5s; }
.ani-03 { animation-delay: 1s; }

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

#pageMenu {
  position: fixed;
  top: 50%;
  right: 40px;
  z-index: 999;
}

#pageMenu li {
  margin: 10px 0;
}

#pageMenu a {
  color: white;
  font-size: 16px;
  position: relative;
  display: block;
  padding-right: 20px;
}

#pageMenu a i {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: #d5d5d5;
  border-radius: 50%;
}

#pageMenu a i::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 17px;
  height: 17px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

#pageMenu li.active a i::before {
  opacity: 1;
}

</style>
