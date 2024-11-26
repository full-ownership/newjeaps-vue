<template>
  <div class="fixed top-24 right-4 z-50 flex items-center justify-end">
    <div class="bg-white rounded-lg shadow-lg w-80 p-6 relative">
      <!-- 헤더 -->
      <div class="flex justify-between items-center border-b pb-2 mb-4">
        <h2 class="text-lg font-semibold">채팅</h2>
        <button class="text-gray-700 hover:text-red-500" @click="disconnectChatRoom">X</button>
      </div>

      <!-- 메시지 목록 -->
      <div class="mb-4 h-60 overflow-y-auto border rounded-lg p-2 bg-gray-50">
        <div v-for="(message, index) in messages" :key="index" class="mb-2">
          <span class="font-bold text-blue-600">[{{ message.sender }}]</span>
          <span class="text-gray-700">{{ message.content }}</span>
        </div>
      </div>

      <!-- 메시지 입력 -->
      <textarea
        v-model="messageContent"
        class="w-full border rounded-lg p-2 mb-2"
        rows="2"
        placeholder="메시지를 입력하세요..."
      ></textarea>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
        @click="sendMessage"
      >
        메시지 보내기
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
  props: {
    area: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      chatRoomId: "", // 채팅방 ID
      messageContent: "", // 전송할 메시지
      messages: [], // 수신된 메시지
      stompClient: null, // STOMP 클라이언트
      isConnected: false, // 연결 상태
    };
  },
  methods: {
    // 방 생성 또는 찾기
    async findOrCreateChatRoom() {
      if (!this.area) {
        console.error("지역 정보가 필요합니다.");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/api/chat/room/${this.area}`, {
          withCredentials: true,
        });
        if (response.data?.data?.chatRoomId) {
          this.chatRoomId = response.data.data.chatRoomId;
          this.connectChatRoom(); // 방을 찾거나 생성 후 연결
        } else {
          console.error("채팅방을 찾거나 생성할 수 없습니다.");
        }
      } catch (error) {
        console.error("채팅방 요청 중 오류:", error);
      }
    },

    // 채팅방 연결
    connectChatRoom() {
      if (!this.chatRoomId) {
        console.error("채팅방 ID가 없습니다.");
        return;
      }
      if (this.isConnected) {
        console.warn("이미 연결된 상태입니다.");
        return;
      }

      const socket = new SockJS("http://localhost:8080/api/ws/chat");
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect(
        {},
        (frame) => {
          console.log("WebSocket 연결 성공:", frame);
          this.isConnected = true;

          // 채팅방 입장
          this.stompClient.send(`/app/room/${this.chatRoomId}/connect`, {}, JSON.stringify({}));

          // 메시지 수신
          this.stompClient.subscribe(`/topic/${this.chatRoomId}`, (message) => {
            const messageData = JSON.parse(message.body);
            this.showMessage(messageData);
          });
        },
        (error) => {
          console.error("WebSocket 연결 오류:", error);
        }
      );
    },

    // 메시지 전송
    sendMessage() {
      if (!this.isConnected || !this.messageContent.trim()) {
        console.error("메시지를 전송하려면 연결 상태와 내용이 필요합니다.");
        return;
      }

      const message = {
        content: this.messageContent.trim(),
        sender: "사용자", // 실제 사용자 ID 또는 닉네임을 넣을 수 있음
      };

      this.stompClient.send(`/app/room/${this.chatRoomId}/message`, {}, JSON.stringify(message));
      this.messageContent = ""; // 메시지 초기화
    },

    // 채팅방 연결 해제
    disconnectChatRoom() {
      if (!this.isConnected || !this.stompClient) {
        console.warn("연결이 활성화되어 있지 않습니다.");
        return;
      }

      this.stompClient.send(`/app/room/${this.chatRoomId}/disconnect`, {}, JSON.stringify({}));
      this.stompClient.disconnect(() => {
        console.log("WebSocket 연결 해제됨");
        this.isConnected = false;
        this.stompClient = null;
        this.$emit("close"); // 모달 닫기 이벤트 호출
      });
    },

    // 수신된 메시지 처리
    showMessage(messageData) {
      this.messages.push(messageData);
    },
  },

  mounted() {
    this.findOrCreateChatRoom(); // 컴포넌트가 로드되면 채팅방 생성/연결
  },

  beforeUnmount() {
    this.disconnectChatRoom(); // 컴포넌트가 파괴되기 전에 WebSocket 연결 해제
  },
};
</script>

<style scoped>
/* 모달을 화면 오른쪽 위에 고정 */
.fixed {
  position: fixed;
  z-index: 1000; /* Z축을 높게 설정 */
}
.top-24 {
  top: 6rem; /* 약 96px 아래로 이동 */
}
.right-4 {
  right: 1rem; /* 오른쪽 간격 유지 */
}
</style>
