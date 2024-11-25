<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '@/stores/userStore'; // Pinia 스토어 import

// 탭 데이터 설정
const tabs = reactive([
  { label: '관심 목록', id: 1 },
  { label: '내 정보', id: 2 },
]);

// 활성화된 탭 상태
const activeTab = ref(tabs[0]); // 기본값: 첫 번째 탭

// Pinia 스토어 인스턴스
const userStore = useUserStore();

// 탭 변경 함수
const changeTab = (tab) => {
  activeTab.value = tab;
};

// 내 정보 수정 데이터
const userInfoForm = reactive({
  nickname: '', // 닉네임
  name: '', // 이름
  email: '', // 이메일
});

// 저장 함수 (예: API 호출)
const saveUserInfo = () => {
  console.log('저장된 정보:', userInfoForm);
  // API 호출 예제
  userStore.updateUserInfo(userInfoForm);
};
</script>

<template>
  <div class="container mx-auto flex flex-col justify-center items-center mt-24 vh-[100vh] pt-12 bg-white">
    <div class="h-[10%] w-full">
      <h1 class="text-5xl font-Pretendard font-bold py-4 text-center">MY 다방</h1>
    </div>
   <!-- 탭 메뉴 -->
    <div class="flex mt-6 border boder-[1px] border-gray-200">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="px-10 py-4 transition-all duration-300 font-Pretendard text-sm"
        :class="{
          'bg-white text-gray-800': activeTab.id !== tab.id, // 비활성화된 탭
          'bg-black text-white': activeTab.id === tab.id // 활성화된 탭
        }"
        @click="changeTab(tab)"
      >
        {{ tab.label }}
      </button>
    </div>
    <!-- 탭 내용 -->
    <div class="flex flex-col w-[35%] border border-gray-200 py-12 rounded-lg mt-6 font-Pretendard ">
      <!-- 관심 목록 -->
      <div v-if="activeTab.id === 1">
        <h2 class="text-3xl mb-4">관심 목록</h2>
        <ul>
          <li v-for="item in ['항목 1', '항목 2', '항목 3']" :key="item" class="py-2">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- 내 정보 수정 -->
      <div v-if="activeTab.id === 2">
        <div class="flex flex-col">
          <div class="flex flex-col items-center mb-8 ">
            <img
              src="https://via.placeholder.com/150/cccccc/000000?text=Profile"
              class="w-32 h-32 rounded-full border-2 border-gray-00 object-cover"
            />
            </div>
            <div class = "m-1 flex flex-col justify-center items-center">

              <div class="w-full flex flex-col items-center">
                <label class="w-[60%] pl-2" >닉네임</label>
              <input v-model="userStore.userInfos.data.nickname"  type="text" class="border-2 border-gray-300 rounded px-2 p y-1 w-[60%] h-[40px]" />
              </div>
            <div class = "m-2 flex flex-col justify-center items-center w-full">
              <label class="w-[60%] pl-2">
              이름</label>
              <input v-model="userStore.userInfos.data.name"  type="text" class="border-2 border-gray-300 rounded px-2 p y-1 w-[60%] h-[40px]" disabled  />
            </div>
            <div class = "m-2 flex flex-col justify-center items-center w-full">
              <label class="w-[60%] pl-2 ">
              이메일</label>
              <input v-model="userStore.userInfos.data.email"  type="text" class="border-2 border-gray-300 rounded px-2 p y-1 w-[60%] h-[40px]" disabled />
            </div>
            <div class="flex justify-center mt-4 w-[60%]">
              <button @click="saveUserInfo" class="bg-blue-500 text-white py-2 px-4 rounded w-full">
              저장
            </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 간단한 스타일링 */
.bg-whites {
  background-color: #f9f9f9;
}
</style>
