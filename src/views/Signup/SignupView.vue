<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router"; // Vue Router 사용
import apiClient from '@/api';

import { useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const goToHome = () => {
  router.push({ name: 'home' });
};
// 사용자 정보 업데이트 API 함수

const register = ()=> {
  router.push({ name: 'login' });
}

// 데이터
const email = ref("");
const password = ref("");
const name = ref("");
const nickname = ref("");
const profileImage = ref(null);
const profileImageName = ref("");
const message = ref("");
const isSending = ref(false); // 이메일 전송 상태
const emailVerified = ref(false); // 이메일 인증 완료 여부

// 모달 상태
const isModalVisible = ref(false);

// 모달 닫기 함수
const closeModal = () => {
  isModalVisible.value = false;
  router.push("/");
};
isModalVisible.value = true;


// 회원가입 처리
// const handleRegister = async () => {
//   if (password.value.length < 8) {
//     message.value = "비밀번호는 최소 8자 이상이어야 합니다.";
//     return;
//   }
//   try {
//     const formData = new FormData();
//     formData.append("email", email.value);
//     formData.append("pwd", password.value);
//     formData.append("name", name.value);
//     formData.append("nickname", nickname.value);

//     if (profileImage.value) {
//       formData.append("profileImage", profileImage.value);
//     }
//     const response = await axios.post(
//       "https://back.newjeaps.com/api/members/register",
//       {
//         email:email.value,
//         pwd:email.value,
//         name:name.value,
//         nickname:nickname.value
//       },
//       {
//         "Content-Type": "application/json", // URL-encoded 형식 명시
//       }
//     );

//     message.value = "회원가입 성공! 이메일 인증을 확인하세요.";
//   } catch (error) {
//     message.value =
//       error.response?.data?.message || "회원가입 중 문제가 발생했습니다.";
//   }
// };

const handleRegister = async () => {
  if (password.value.length < 8) {
    message.value = "비밀번호는 최소 8자 이상이어야 합니다.";
    return;
  }
  try {
    // JSON 형식으로 데이터 전송
    const data = {
      "email": email.value,
      "pwd": password.value,
      "name": name.value,
      "nickname": nickname.value,
    };

    console.log(data)

      const response = await axios.post(
        "http://localhost:8080/api/members/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      message.value = "회원가입 성공! 이메일 인증을 확인하세요.";
      return;
  
  } catch (error) {
    message.value =
      error.response?.data?.message || "회원가입 중 문제가 발생했습니다.";
    console.error("Error response:", error.response);
  }
};



// 파일 업로드 처리
const handleFileUpload = (event) => {
  profileImage.value = event.target.files[0];
  profileImageName.value = event.target.files[0]?.name || "";
};

const verifedEmail = ref("");

// 이메일 인증 처리
const sendEmailVerification = async (emailAddress) => {
  try {
    isSending.value = true; // 전송 중 상태 활성화
    const response = await apiClient.post(
      "/api/members/register-email",
      { email: emailAddress } // payload
    );
    message.value = "이메일 인증 링크가 전송되었습니다!";
  } catch (error) {
    message.value =
      error.response?.data?.message || "이메일 인증 요청 중 문제가 발생했습니다.";
  } finally {
    isSending.value = false; // 전송 상태 비활성화
  }
};

// URL에서 인증 코드 추출 및 검증
const verifyEmailCode = async () => {
  const code = route.query.code; // URL 쿼리 파라미터에서 'code' 추출
  if (!code) {
    message.value = "인증 코드가 없습니다.";
    return;
  }
  try {
    // GET 요청으로 쿼리 파라미터 전달
    const response = await axios.get(
      "https://back.newjeaps.com/api/members/verified-email",
      {
        params: { code }, // 'code'를 쿼리 파라미터로 추가
      }
    );
    emailVerified.value = true; // 인증 완료 상태 설정
    message.value = "이메일 인증이 완료되었습니다!";
    verifedEmail.value= response.data.data.email;
    //console.log("Response:", response.data.data.email); // 서버 응답 확인
  } catch (error) {
    message.value =
      error.response?.data?.message || "이메일 인증 중 문제가 발생했습니다.";
    console.error("Error response:", error.response); // 에러 응답 확인
  }
};

// 컴포넌트가 마운트되었을 때 URL의 인증 코드를 검증
onMounted(() => {
  verifyEmailCode();
});
</script>
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-lg bg-white rounded border border-gray-100 px-20 py-20 rounded-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">회원가입</h1>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- 이메일 -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            이메일 주소
          </label>
          <div class="flex items-center mt-1">
            <input
              v-model="email"
              type="email"
              id="email"
              :placeholder="verifedEmail"
              class="flex-1 block rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              :disabled="emailVerified"
              required
            />
            <button
              type="button"
              class="ml-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"
              :disabled="isSending || emailVerified"
              @click="sendEmailVerification(email)"
            >
              {{ isSending ? "발송 중..." : emailVerified ? "인증 완료" : "이메일 인증" }}
            </button>
          </div>
        </div>

        <!-- 비밀번호 -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <!-- 이름 -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            이름
          </label>
          <input
            v-model="name"
            type="text"
            id="name"
            placeholder="이름 입력"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <!-- 닉네임 -->
        <div>
          <label for="nickname" class="block text-sm font-medium text-gray-700">
            닉네임
          </label>
          <input
            v-model="nickname"
            type="text"
            id="nickname"
            placeholder="닉네임 입력"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            required
          />
        </div>

        <!-- 제출 버튼 -->
        <button
          type="submit"
          class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"
          @click="register"
        >
          가입하기
        </button>
      </form>
      <p v-if="message" class="mt-4 text-center text-sm text-gray-600">
        {{ message }}
      </p>
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

<style>
body {
  font-family: "Inter", sans-serif;
}

.bg-primary {
  background-color: #5995ed;
}

.bg-primary-dark {
  background-color: #407bcd;
}

.text-primary {
  color: #5995ed;
}
</style>
