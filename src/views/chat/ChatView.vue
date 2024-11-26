<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <header class="bg-blue-500 text-white py-4 shadow-md">
      <div class="container mx-auto px-4">
        <h1 class="text-center text-xl font-semibold">WebSocket Chat Room</h1>
      </div>
    </header>
    <main class="flex-1 container mx-auto px-4 py-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <!-- Region 입력 -->
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">Region</label>
          <div class="flex gap-4">
            <input
              v-model="region"
              type="text"
              class="flex-grow border rounded-lg px-4 py-2"
              placeholder="Enter Region"
            />
            <button
              @click="findOrCreateChatRoom"
              class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Find/Create Room
            </button>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">Chat Room Info</label>
          <div class="flex flex-wrap gap-4">
            <input
              v-model="chatRoomId"
              type="text"
              class="flex-grow border rounded-lg px-4 py-2"
              placeholder="Chat Room ID"
            />
            <button
              @click="connectChatRoom"
              class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Connect
            </button>
            <button
              @click="disconnectChatRoom"
              class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Disconnect
            </button>
          </div>
        </div>

        <!-- 메시지 입력 -->
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">Message</label>
          <div class="flex gap-4">
            <input
              v-model="messageContent"
              type="text"
              class="flex-grow border rounded-lg px-4 py-2"
              placeholder="Enter Message"
            />
            <button
              @click="sendMessage"
              class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Send Message
            </button>
          </div>
        </div>

        <!-- 메시지 출력 -->
        <div class="mb-6 h-64 overflow-y-auto bg-gray-50 border rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Messages</h3>
          <div v-if="messages.length === 0" class="text-gray-500">
            No messages yet.
          </div>
          <div v-for="(msg, index) in messages" :key="index" class="mb-2">
            <span class="font-medium text-blue-600">{{ msg.nickname || "User" }}</span>:
            <span class="text-gray-700">{{ msg.content }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
 // 서버 URL

export default {
  data() {
    return {
      region: "", // 지역명
      chatRoomId: "", // 채팅방 ID
      messageContent: "", // 전송할 메시지 내용
      messages: [], // 수신된 메시지 목록
      stompClient: null, // STOMP 클라이언트
      isConnected: false, // 연결 상태
    };
  },
  methods: {
    // 방 생성 또는 찾기
    async findOrCreateChatRoom() {
      console.log("Starting findOrCreateChatRoom");
      if (!this.region) {
        console.error("Error: Region is required to find or create a chat room.");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/api/chat/room/${this.region}`, {
          withCredentials: true,
        });
        console.log("API Response:", response.data);
        if (response.data?.data?.chatRoomId) {
          this.chatRoomId = response.data.data.chatRoomId;
          console.log("Chat Room ID:", this.chatRoomId);
        } else {
          console.error("Error: Chat room not found or could not be created.");
        }
      } catch (error) {
        console.error("Error while finding or creating a chat room:", error);
      }
    },

    connectChatRoom() {
      if (!this.chatRoomId) {
        console.error("Error: Chat Room ID is required to connect.");
        return;
      }
      if (this.isConnected) {
        console.warn("Already connected to a chat room.");
        return;
      }

      console.log(`Connecting to chat room: ${this.chatRoomId}...`);

      const socket = new WebSocket("ws://localhost:8080/api/ws/chat");
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect(
        {},
        (frame) => {
          console.log("WebSocket connected:", frame);
          this.isConnected = true;


          this.stompClient.send(`/app/room/${this.chatRoomId}/connect`, {}, JSON.stringify({}));

          // 메시지 구독
          this.stompClient.subscribe(`/topic/${this.chatRoomId}`, (message) => {
            const messageData = JSON.parse(message.body);
            console.log("Message received:", messageData);
            this.showMessage(messageData);
          });
        },
        (error) => {
          console.error("WebSocket connection error:", error);
        }
      );
    },

    // 메시지 전송
    sendMessage() {
      if (!this.isConnected || !this.messageContent) {
        console.error("Error: Connection required and message content cannot be empty.");
        return;
      }

      const message = {
        content: this.messageContent, // 닉네임 없이 메시지 내용만 포함
      };

      console.log("Sending message:", message);

      this.stompClient.send(`/app/room/${this.chatRoomId}/message`, {}, JSON.stringify(message));

      this.messageContent = "";
    },

    // WebSocket 연결 해제
    disconnectChatRoom() {
      if (!this.isConnected || !this.stompClient) {
        console.warn("No active connection to disconnect.");
        return;
      }

      console.log(`Disconnecting from chat room: ${this.chatRoomId}...`);

      this.stompClient.send(`/app/room/${this.chatRoomId}/disconnect`, {}, JSON.stringify({}));

      this.stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket.");
        this.isConnected = false;
        this.stompClient = null;
      });
    },

    // 메시지 출력
    showMessage(messageData) {
      console.log("Displaying message:", messageData);
      this.messages.push(messageData);
    },
  },
};
</script>

<style>
/* Tailwind 스타일 */
</style>
