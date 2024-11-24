<script setup>
import { reactive, ref } from 'vue';

// 탭 데이터 설정
const tabs = reactive([
  { label: '1:1 문의내역', id: 1 },
  { label: '내정보', id: 2 },
]);

// 활성화된 탭 상태
const activeTab = ref(tabs[0]); // 기본값: 첫 번째 탭
</script>
<template>
    <div class="container mx-auto flex flex-col justify-center items-center mt-8 vh-[100vh] pt-12 bg-whites">
      <div class="bg-pink-100 h-[10%]">
        <h1 class="text-3xl font-Pretendard font-bold py-4 text-center">MY 다방</h1>
      </div>
      <div class="flex flex-col w-[40%] border-4 border-gray-600 py-12 rounded-lg">
        <div>
          <span>
            
          </span>
        </div>
        <div class="">
          연결된 소셜계정
        </div>
        <div class="">
          닉네임
        </div>
        <div class="">
          이름
        </div>
        <div class="">
          이메일
        </div>
        
      </div>
      
      

    </div>
  </template>
  
  <script setup>

  </script>
  