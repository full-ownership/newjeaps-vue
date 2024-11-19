<template>
  <div>
    <button
      @click="toggleChat"
      class="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#4A90E2] text-white text-2xl flex items-center justify-center shadow-lg hover:bg-[#357ABD] transition"
    >
      💬
    </button>

    <div
      v-if="isChatOpen"
      class="fixed bottom-24 right-6 w-96 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col"
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

      <!-- Messages -->
      <div class="flex-1 p-4 space-y-2 overflow-y-auto">
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
      </div>

      <!-- Quick Action Buttons -->
      <div class="p-4 border-t border-gray-200 flex space-x-2 overflow-x-auto">
        <button
          v-for="(question, index) in quickQuestions"
          :key="index"
          @click="sendQuickMessage(question.text)"
          class="bg-[#4A90E2] text-white px-3 py-2 rounded-lg hover:bg-[#357ABD] transition whitespace-nowrap"
        >
          {{ question.label }}
        </button>
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t border-gray-200 flex items-center space-x-2">
        <input
          v-model="userMessage"
          type="text"
          placeholder="메시지를 입력하세요..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#4A90E2]"
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
import { ref } from "vue";

// Chat state
const isChatOpen = ref(false);
const userMessage = ref("");
const messages = ref([]);

// Predefined quick action questions
const quickQuestions = ref([
  { label: "매매 시세", text: "현재 매매 시세가 궁금해요." },
  { label: "전세 시세", text: "전세 시세를 알고 싶어요." },
  { label: "대출 상담", text: "대출 상담을 받고 싶어요." },
]);

// Functions
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const sendMessage = () => {
  if (userMessage.value.trim()) {
    // Add user message
    messages.value.push({ text: userMessage.value, sender: "user" });
    const currentMessage = userMessage.value; // Keep a copy of the message
    userMessage.value = "";

    // Simulate chatbot response
    setTimeout(() => {
      messages.value.push({
        text: getBotResponse(currentMessage),
        sender: "bot",
      });
    }, 1000);
  }
};

const sendQuickMessage = (text) => {
  // Automatically send predefined quick question
  userMessage.value = text;
  sendMessage();
};

const getBotResponse = (text) => {
  // Basic bot responses for demonstration
  if (text.includes("매매 시세")) return "현재 매매 시세는 지역마다 다릅니다. 구체적인 지역을 알려주세요!";
  if (text.includes("전세 시세")) return "전세 시세는 부동산 플랫폼에서 확인하거나 상담을 받아보세요.";
  if (text.includes("대출 상담")) return "대출 상담을 위해 고객센터에 문의해주세요.";
  return "질문을 이해하지 못했어요. 다시 말씀해 주세요.";
};
</script>
