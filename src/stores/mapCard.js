import { defineStore } from 'pinia';
import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useHouseInfoStore = defineStore('houseInfo', {
  state: () => ({
    houseInfos: { data: [] }, // 상태 정의 (초기값)
  }),
  actions: {
    async fetchHouseInfo(type) {
      try {
        // URL을 BASE_URL과 합쳐서 사용
        const response = await axios.get(`https://back.newjeaps.com/api/houseinfos/${type}`);
        // response.data.data를 houseInfos에 할당 (주요 수정 부분)
        this.houseInfos = response.data.data;
        // response.data를 콘솔에 출력하여 디버깅
      } catch (error) {
        console.log('데이터를 가져오는데 실패했습니다.', error);
      }
    },
  },
});
