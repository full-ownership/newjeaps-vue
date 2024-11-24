import { defineStore } from 'pinia';
import axios from 'axios';
import apiClient from '@/api'; // 위에서 만든 axios 인스턴스를 import

export const useUserStore = defineStore('userInfo', {
  state: () => ({
    userInfos: { data: [] }, // 상태 정의 (초기값)
  }),
  actions: {
    async fetchUserInfo() {
      try {
        // URL을 BASE_URL과 합쳐서 사용
        console.log("userStore 동작")
        const response = await apiClient.get(`/api/members/nickname`);
        // response.data.data를 houseInfos에 할당 (주요 수정 부분)
        this.userInfos.data = response.data.data;
        // response.data를 콘솔에 출력하여 디버깅
        console.log('userStore'+response.data.data);
        
      } catch (error) {
        console.log('데이터를 가져오는데 실패했습니다.', error);
      }
    },
  },
});
