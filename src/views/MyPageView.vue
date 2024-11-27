<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import apiClient from '@/api';


import { useRouter } from "vue-router";

const router = useRouter(); // Vue Router 사용
 // 특정 경로로 리다이렉트

// 탭 데이터 설정
const tabs = reactive([
  { label: '관심 목록', id: 1 },
  { label: '내 정보', id: 2 },
]);

const activeTab = ref(tabs[0]);
const userInfo = ref({
  nickname: '',
  profileImg: '',
  name: '',
  email: '',
  role: '',
});

const userStore = useUserStore();
onMounted(() => {
  userInfo.value = { ...userStore.userInfos.data };
});

// 탭 변경 함수
const changeTab = (tab) => {
  activeTab.value = tab;
};

// 모달 상태
const isModalVisible = ref(false);

// 모달 닫기 함수
const closeModal = () => {
  isModalVisible.value = false;
  router.push("/");
};

// 저장 함수
const saveUserInfo = async () => {
  try {
    const data = {
      nickname: userInfo.value.nickname,
      profileImg: userInfo.value.profileImg,
    };
    await updateUser(data);
    console.log('유저 정보 업데이트 완료');

    // 모달 표시
    isModalVisible.value = true;
  } catch (error) {
    console.error('유저 정보 업데이트 실패:', error.response ? error.response.data : error.message);
  }
};

// API 호출 함수
const updateUser = (data) => {
  return apiClient.put('/api/members/account', data);
};
</script>

<template>
  <div class="container mx-auto flex flex-col justify-center items-center mt-24 vh-[100vh] pt-12 bg-white">
    <h1 class="text-4xl font-bold py-4 text-center">MY 뉴집스</h1>
    
    <!-- 탭 메뉴 -->
    <div class="flex mt-6 border border-gray-200">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="px-10 py-4 transition-all duration-300"
        :class="{
          'bg-white text-gray-800': activeTab.id !== tab.id,
          'bg-black text-white': activeTab.id === tab.id
        }"
        @click="changeTab(tab)"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <!-- 탭 내용 -->
    <div class="z-50 w-[35%] border border-gray-200 py-12 rounded-lg mt-6 ">
      <div v-if="activeTab.id === 1">
        <h2 class="text-3xl mb-4">관심 목록</h2>
        <ul>
          <li v-for="item in ['항목 1', '항목 2', '항목 3']" :key="item" class="py-2">{{ item }}</li>
        </ul>
      </div>
      <div v-if="activeTab.id === 2">
        <div class="flex flex-col">
          <div class="flex flex-col items-center mb-8">
            <img src="@/assets/icons/account.png" />
          </div>
          <div class="m-1 flex flex-col justify-center items-center">
            <div class="w-full flex flex-col items-center">
              <label class="w-[60%] pl-2">닉네임</label>
              <input v-model="userInfo.nickname" type="text" class="border-2 border-gray-300 rounded px-2 py-1 w-[60%]" />
            </div>
            <div class="m-2 flex flex-col justify-center items-center w-full">
              <label class="w-[60%] pl-2">이름</label>
              <input v-model="userInfo.name" type="text" class="border-2 border-gray-300 rounded px-2 py-1 w-[60%]" disabled />
            </div>
            <div class="m-2 flex flex-col justify-center items-center w-full">
              <label class="w-[60%] pl-2">이메일</label>
              <input v-model="userInfo.email" type="text" class="border-2 border-gray-300 rounded px-2 py-1 w-[60%]" disabled />
            </div>
            <div class="flex justify-center mt-4 w-[60%]">
              <button @click="saveUserInfo" class="bg-blue-500 text-white py-2 px-4 rounded w-full">저장</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 모달 -->
    <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center z-[1000]" style="z-index: 500;">
      <div class="bg-white p-6 rounded shadow-lg w-[80%] max-w-md">
        <h2 class="text-xl font-bold mb-4">업데이트 완료</h2>
        <p>유저 정보가 성공적으로 업데이트되었습니다.</p>
        <div class="mt-4 flex justify-end">
          <button @click="closeModal" class="bg-blue-500 text-white py-2 px-4 rounded">닫기</button>
        </div>
      </div>
    </div>

  </div>
</template>
