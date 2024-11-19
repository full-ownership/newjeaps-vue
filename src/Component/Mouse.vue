<template>
<div class="mouse_scroll bg-yellow-600" aria-label="스크롤 유도">
    <span class="mouse mx-auto">
      <div id="mouse_wheel" class="w-[1px] h-[5px] border border-gray-600 rounded-lg mx-auto mt-1"></div>
    </span>
    <div class="dowm_arrow">
        <span class="arrow-next1"></span>
        <span class="arrow-next1"></span>
    </div>
    <div class="mention">
      scroll down
    </div>
    <!-- 45deg : > 225deg : < 135deg 아래 315deg 위 -->
</div>
</template>

<style scoped lang="scss">
/* scoped 스타일 적용 */

.mouse_scroll {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  position: relative;
  margin-top: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.mouse {
  width: 20px;
  height: 30px;
  border: 3px solid #2a2a2a;
  border-radius: 20px;
  margin-bottom: 0px;
  position: relative;
  animation: bounce 1.5s infinite;
}

.dowm_arrow {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

// 스크롤을 아래로 당기세요 글귀
.mention{
  animation: bounce 1.5s infinite;
  margin-top: 10px;
  color: #2a2a2a;;
}

// 화살표
.arrow-next1 {
    position: relative;
    float:left;
    animation: bounce 1.5s infinite;
    // animation-delay: 0.5s;
    margin: 3px 0;
    margin-right: 4px;
}
.arrow-next1::after {
    position: absolute;
    content: '';
    width: 5px; /* 사이즈 */
    height: 5px; /* 사이즈 */
    border-top: 2px solid #2a2a2a; /* 선 두께 */
    border-right:2px solid #2a2a2a; /* 선 두께 */
    transform: rotate(135deg); /* 각도 */
}
// 화살표 끝

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
  100% {
    transform: translateY(0);
  }
}

</style>
