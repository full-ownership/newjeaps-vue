<template>
    <div class="flex border-b-2 border-gray-200">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab-item', { active: activeTab === tab.key }]"
        @click="selectTab(tab.key)"
        :aria-selected="activeTab === tab.key"
        class="tab-item"
      >
        {{ tab.label }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const activeTab = ref('info');
  
  // 탭 리스트 정의
  const tabs = [
    { key: 'info', label: '주요 안내' },
    { key: 'news', label: '공지사항 및 뉴스' },
    { key: 'faq', label: '자주 묻는 질문' },
  ];
  
  // 탭 선택 함수
  const selectTab = (tab) => {
    activeTab.value = tab;
    // 상위 컴포넌트로 탭 변경 이벤트 발송
    router.push({ name: tab }); // 탭이 변경될 때마다 경로 변경
  };
  
  // 외부에서 activeTab이 변경될 경우를 감지
  watch(activeTab, (newTab) => {
    console.log(`현재 활성화된 탭: ${newTab}`);
  });
  </script>
  
  <style scoped>
  .tab-item {
    padding: 1rem;
    font-weight: bold;
    color: #4a4a4a;
    transition: color 0.2s, border-color 0.2s;
  }
  .tab-item:hover {
    color: #1a1a1a;
  }
  .active {
    border-bottom: 2px solid #3b82f6;
    color: #1a1a1a;
  }
  </style>
  