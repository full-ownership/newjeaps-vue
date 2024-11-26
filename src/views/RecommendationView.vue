
 <template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <!-- 추천 폼 -->
    <div class="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 relative z-10">
      <header class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-800">🏡 부동산 투자 추천</h1>
        <p class="text-lg text-gray-600 mt-2">목표와 금액을 입력하고 최적의 투자 전략을 확인하세요.</p>
      </header>

      <!-- 입력 폼 -->
      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label for="goal" class="block text-lg font-medium text-gray-700">투자 목표</label>
          <input
            type="text"
            id="goal"
            v-model="formData.goal"
            class="mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 text-lg p-4"
            placeholder="예: 높은 수익"
            required
          />
        </div>

        <div>
          <label for="budget" class="block text-lg font-medium text-gray-700">투자 금액 (원)</label>
          <input
            type="number"
            id="budget"
            v-model.number="formData.budget"
            class="mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 text-lg p-4"
            placeholder="예: 700000000"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          추천받기
        </button>
      </form>

      <!-- 로딩 상태 -->
      <div v-if="loading" class="mt-6 text-center text-blue-500 font-semibold text-lg">
        🔄 추천을 계산 중입니다...
      </div>
    </div>

    <!-- 추천 결과 모달 -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <!-- 클릭 시 닫기 기능 -->
      <div class="absolute inset-0" @click="closeModal"></div>

      <!-- 모달 내용 -->
      <div
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6 relative overflow-hidden animate-slide-up"
      >
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ✖
        </button>
        <h2 class="text-2xl font-bold text-gray-800 mb-6">추천 결과</h2>
        <div v-html="renderMarkdown(response)" class="prose max-w-full"></div>
      </div>
    </div>

    <!-- 오류 메시지 -->
    <div v-if="error" class="absolute bottom-4 left-4 bg-red-100 text-red-600 font-medium rounded-md px-4 py-3 shadow-lg text-lg">
      ❌ 오류가 발생했습니다: {{ error }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { marked } from "marked";
import DOMPurify from "dompurify"; // HTML 보안 처리

export default {
  name: "RecommendInvestment",
  data() {
    return {
      formData: {
        goal: "", // 투자 목표
        budget: null, // 투자 금액
      },
      response: null, // 서버에서 받은 추천 결과 (Markdown 형식)
      loading: false, // 로딩 상태
      error: null, // 오류 메시지
      showModal: false, // 모달 표시 여부
    };
  },
  methods: {
    async submitForm() {
      // 추천 요청 처리
      this.loading = true;
      this.error = null;
      this.response = null;
      this.showModal = false;

      try {
        const res = await axios.post(
          "https://d906-121-147-32-107.ngrok-free.app/recommend/",
          this.formData
        );
        this.response = res.data.recommendation; // 응답 데이터를 저장
        this.showModal = true; // 모달 표시
      } catch (err) {
        this.error = err.response?.data?.detail || "추천 요청 중 문제가 발생했습니다.";
      } finally {
        this.loading = false;
      }
    },
    renderMarkdown(markdown) {
      // Markdown을 HTML로 변환한 뒤 보안 처리
      return DOMPurify.sanitize(marked(markdown));
    },
    closeModal() {
      this.showModal = false; // 모달 닫기
    },
  },
};
</script>

<style>
/* Tailwind 기반 스타일 사용 */

/* 모달 애니메이션 */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>
=======
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <!-- 추천 폼 -->
      <div class="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 relative z-10">
        <header class="text-center mb-8">
          <h1 class="text-3xl font-extrabold text-gray-800">🏡 부동산 투자 추천</h1>
          <p class="text-lg text-gray-600 mt-2">목표와 금액을 입력하고 최적의 투자 전략을 확인하세요.</p>
        </header>
  
        <!-- 입력 폼 -->
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="goal" class="block text-lg font-medium text-gray-700">투자 목표</label>
            <input
              type="text"
              id="goal"
              v-model="formData.goal"
              class="mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 text-lg p-4"
              placeholder="예: 높은 수익"
              required
            />
          </div>
  
          <div>
            <label for="budget" class="block text-lg font-medium text-gray-700">투자 금액 (원)</label>
            <input
              type="number"
              id="budget"
              v-model.number="formData.budget"
              class="mt-2 block w-full rounded-lg border-gray-300 shadow-md focus:border-blue-500 focus:ring-blue-500 text-lg p-4"
              placeholder="예: 700000000"
              required
            />
          </div>
  
          <button
            type="submit"
            class="w-full py-3 px-4 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            추천받기
          </button>
        </form>
  
        <!-- 로딩 상태 -->
        <div v-if="loading" class="mt-6 text-center text-blue-500 font-semibold text-lg">
          🔄 추천을 계산 중입니다...
        </div>
      </div>
  
      <!-- 추천 결과 모달 -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <!-- 클릭 시 닫기 기능 -->
        <div class="absolute inset-0" @click="closeModal"></div>
  
        <!-- 모달 내용 -->
        <div
          class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6 relative overflow-hidden animate-slide-up"
        >
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✖
          </button>
          <h2 class="text-2xl font-bold text-gray-800 mb-6">추천 결과</h2>
          <div v-html="renderMarkdown(response)" class="prose max-w-full"></div>
        </div>
      </div>
  
      <!-- 오류 메시지 -->
      <div v-if="error" class="absolute bottom-4 left-4 bg-red-100 text-red-600 font-medium rounded-md px-4 py-3 shadow-lg text-lg">
        ❌ 오류가 발생했습니다: {{ error }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { marked } from "marked";
  import DOMPurify from "dompurify"; // HTML 보안 처리
  
  export default {
    name: "RecommendInvestment",
    data() {
      return {
        formData: {
          goal: "", // 투자 목표
          budget: null, // 투자 금액
        },
        response: null, // 서버에서 받은 추천 결과 (Markdown 형식)
        loading: false, // 로딩 상태
        error: null, // 오류 메시지
        showModal: false, // 모달 표시 여부
      };
    },
    methods: {
      async submitForm() {
        // 추천 요청 처리
        this.loading = true;
        this.error = null;
        this.response = null;
        this.showModal = false;
  
        try {
          const res = await axios.post(
            "https://d906-121-147-32-107.ngrok-free.app/recommend/",
            this.formData
          );
          this.response = res.data.recommendation; // 응답 데이터를 저장
          this.showModal = true; // 모달 표시
        } catch (err) {
          this.error = err.response?.data?.detail || "추천 요청 중 문제가 발생했습니다.";
        } finally {
          this.loading = false;
        }
      },
      renderMarkdown(markdown) {
        // Markdown을 HTML로 변환한 뒤 보안 처리
        return DOMPurify.sanitize(marked(markdown));
      },
      closeModal() {
        this.showModal = false; // 모달 닫기
      },
    },
  };
  </script>
  
  <style>
  /* Tailwind 기반 스타일 사용 */
  
  /* 모달 애니메이션 */
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
  </style>
