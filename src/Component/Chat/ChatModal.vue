<template>
  <div class="fixed top-24 right-4 z-50 flex items-center justify-end">
    <div class="bg-white rounded-lg shadow-lg w-80 p-6 relative">
      <!-- 헤더 -->
      <div class="flex justify-between items-center border-b pb-2 mb-4">
        <h2 class="text-lg font-semibold" style="color: var(--main-color)">
          부동산 종토방~ (참가자: {{ participantCount }})
        </h2>
        <button
          class="text-gray-700 hover:text-red-500"
          @click="handleClose"
        >
          X
        </button>
      </div>

      <!-- 메시지 목록 -->
      <div class="mb-4 h-60 overflow-y-auto border rounded-lg p-2 bg-gray-50">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="flex items-start mb-2"
          :class="{
            'justify-end': message.nickname === userNickname, // 내 메시지인 경우 오른쪽 정렬
            'justify-start': message.nickname !== userNickname, // 상대방 메시지인 경우 왼쪽 정렬
          }"
        >
          <div class="flex flex-col max-w-[70%]">
            <!-- 닉네임 -->
            <span
              class="text-xs font-semibold"
              :class="{
                'text-right text-main-color': message.nickname === userNickname, // 내 닉네임
                'text-left text-gray-600': message.nickname !== userNickname, // 상대방 닉네임
              }"
            >
              {{ message.nickname }}
            </span>
            <!-- 메시지 내용 -->
            <div
              class="px-4 py-2 rounded-lg text-sm"
              :class="{
                'bg-main-color text-white self-end': message.nickname === userNickname, // 내 메시지 스타일
                'bg-gray-200 text-gray-800 self-start': message.nickname !== userNickname, // 상대방 메시지 스타일
              }"
            >
              {{ message.content }}
            </div>
          </div>
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
        class="bg-[#5995ed] text-white px-4 py-2 rounded-lg w-full hover:bg-[#497ccf]"
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
      participantCount: 0, // 참가자 수
      userNickname: "", // 내 닉네임
    };
  },
  methods: {
    // 내 닉네임 가져오기
    async fetchNickname() {
      try {
        const response = await axios.get("https://back.newjeaps.com/api/members/nickname", { withCredentials: true });
        this.userNickname = response.data.nickname;
        console.log("내 닉네임:", this.userNickname);
      } catch (error) {
        console.error("닉네임 가져오기 실패:", error);
      }
    },

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
          await this.fetchMessages(); // 메시지 목록 가져오기
          await this.fetchParticipantCount(); // 참가자 수 가져오기
          this.connectChatRoom(); // 방 연결
        } else {
          console.error("채팅방을 찾거나 생성할 수 없습니다.");
        }
      } catch (error) {
        console.error("채팅방 요청 중 오류:", error);
      }
    },

    // 참가자 수 가져오기
    async fetchParticipantCount() {
      if (!this.chatRoomId) {
        console.error("채팅방 ID가 없습니다.");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/api/chat/room/${this.chatRoomId}/participants/count`,
          { withCredentials: true }
        );
        this.participantCount = response.data?.data?.count || 0;
      } catch (error) {
        console.error("참가자 수를 가져오는 중 오류:", error);
      }
    },

    // 메시지 목록 가져오기
    async fetchMessages() {
      if (!this.chatRoomId) {
        console.error("채팅방 ID가 없습니다.");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/api/chat/room/${this.chatRoomId}/messages`,
          { withCredentials: true }
        );
        this.messages = response.data?.data || [];
      } catch (error) {
        console.error("메시지 목록을 가져오는 중 오류:", error);
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

      const socket = new WebSocket("ws://localhost:8080/api/ws/chat");
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
        nickname: this.userNickname, // 내 닉네임 추가
      };

      this.stompClient.send(`/app/room/${this.chatRoomId}/message`, {}, JSON.stringify(message));
      this.messageContent = ""; // 메시지 초기화
    },

    // 수신된 메시지 처리
    showMessage(messageData) {
      this.messages.push(messageData);
    },

    // WebSocket 연결 해제
    disconnectChatRoom() {
      if (this.stompClient) {
        this.stompClient.disconnect(() => {
          console.log("WebSocket 연결 해제됨");
        });
      }
      this.isConnected = false;
    },

    // 모달 닫기
    handleClose() {
      this.disconnectChatRoom(); // 연결 해제
      this.$emit("close"); // 부모 컴포넌트에 이벤트 전달
    },
  },

  async mounted() {
    await this.fetchNickname(); // 내 닉네임 불러오기
    this.findOrCreateChatRoom(); // 채팅방 생성 및 연결
  },
};
</script>

<style scoped>
/* 메인 색상 정의 */
:root {
  --main-color: #5995ed; /* 원하는 색상으로 변경 */
}

/* 메시지 스타일 */
.text-main-color {
  color: var(--main-color);
}

.bg-main-color {
  background-color: var(--main-color);
}

/* 모달 위치 */
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
