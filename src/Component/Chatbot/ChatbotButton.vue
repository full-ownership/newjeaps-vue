<template>
  <div>
    <!-- Chat Toggle Button -->
    <button
  @click="toggleChat"
  class="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-white text-[#4A90E2] flex items-center justify-center shadow-[6px_6px_10px_rgba(0,0,0,0.2),-6px_-6px_10px_rgba(255,255,255,0.8)] hover:shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(255,255,255,1)] transition-transform transform hover:scale-95"
>
  <img src="@/assets/icons/chatbot.png" alt="챗봇 아이콘" class="w-10 h-10" />
</button>






    <!-- Chat Window -->
    <div
      v-if="isChatOpen"
      class="fixed bottom-24 right-6 w-96 h-[500px] bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col"
    >
      <!-- Header -->
      <div class="bg-[#4A90E2] text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 class="text-lg font-semibold">챗봇</h3>
        <button
          @click="toggleChat"
          class="text-white text-lg font-semibold hover:text-gray-300"
        >
          ✖
        </button>
      </div>

      <!-- Messages Section -->
      <div
        ref="messagesContainer"
        class="flex-1 p-4 space-y-2 overflow-y-auto"
      >
        <!-- Messages -->
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.sender === 'user' ? 'text-right' : 'text-left'"
        >
          <span
            :class="msg.sender === 'user'
              ? 'inline-block bg-[#4A90E2] text-white py-2 px-3 rounded-lg'
              : 'inline-block bg-gray-100 text-gray-800 py-2 px-3 rounded-lg'"
          >
            {{ msg.text }}
          </span>
        </div>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex justify-center items-center mt-4 mb-4">
          <div class="loader"></div>
        </div>
      </div>

      <!-- Input Section -->
      <div class="p-4 border-t border-gray-200 flex items-center space-x-2">
        <input
          v-model="userMessage"
          type="text"
          placeholder="메시지를 입력하세요..."
          class="flex-1 px-4 py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#4A90E2]"
          @keypress.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          class="bg-[#4A90E2] text-white px-6 py-2 rounded-lg hover:bg-[#357ABD] transition"
        >
          보내기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import axios from "axios";

// Chat state
const isChatOpen = ref(false);
const userMessage = ref("");
const messages = ref([]);
const isLoading = ref(false);
const messagesContainer = ref(null);

// Toggle Chat
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

// Scroll to Bottom
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

// Send Message
const sendMessage = async () => {
  if (userMessage.value.trim()) {
    // 사용자 메시지 추가
    messages.value.push({ text: userMessage.value, sender: "user" });
    const currentMessage = userMessage.value;
    userMessage.value = ""; // 입력 필드 초기화
    scrollToBottom(); // 스크롤 아래로 이동

    isLoading.value = true; // 로딩 시작

    try {
      // GPT API 요청
      const response = await axios.post(
        "https://7da2-49-246-51-17.ngrok-free.app/ask/",
        { query: currentMessage },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      // 서버 응답 추가
      const { response: botResponse } = response.data;
      messages.value.push({
        text: botResponse || "답변을 받을 수 없었습니다. 다시 시도해주세요.",
        sender: "bot",
      });
      scrollToBottom(); // 스크롤 아래로 이동
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      messages.value.push({
        text: "죄송합니다, 서버 요청 중 문제가 발생했습니다. 다시 시도해주세요.",
        sender: "bot",
      });
      scrollToBottom(); // 스크롤 아래로 이동
    } finally {
      isLoading.value = false; // 로딩 종료
    }
  }
};

// Send Quick Action Message
// const sendQuickMessage = (text) => {
//   userMessage.value = text;
//   sendMessage();
// };
</script>

<style scoped>
/* 고정 높이 설정 */
.flex-1 {
  height: calc(100% - 100px); /* 전체 높이에서 헤더와 입력 필드 제외 */
  overflow-y: auto; /* 스크롤 활성화 */
}

/* 로딩 애니메이션 */
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
