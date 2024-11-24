import { defineStore } from 'pinia';
import axios from 'axios';
import apiClient from '@/api'; // 위에서 만든 axios 인스턴스를 import

export const useHouseInfoStore = defineStore('houseInfo', {
  state: () => ({
    houseInfos: { data: [] }, // 상태 정의 (초기값)
  }),
  actions: {
    async fetchHouseInfo(type) {
      try {
        // URL을 BASE_URL과 합쳐서 사용
        console.log("맵카드")
        console.log(apiClient)
        const response = await apiClient.get(`/api/houseinfos/${type}`);
        // response.data.data를 houseInfos에 할당 (주요 수정 부분)
        this.houseInfos= response.data.data;

        // response.data를 콘솔에 출력하여 디버깅

        console.log(response.data.data);


  
      } catch (error) {
        console.log('데이터를 가져오는데 실패했습니다.', error);
      }
    },
    
    // 필터링된 데이터를 가져오는 메서드
    async fetchFilteredHouseInfo({ 
      buildingUse,
      fromPrice,
      toPrice,
      // fromArea,
      // toArea,
      // fromConstructYear,
      // toConstructYear,
      // fromFloor,
      // toFloor,
     }) {
      try {
        // URL 쿼리 파라미터를 생성
        const queryParams = new URLSearchParams({

          buildingUse:buildingUse,
          fromPrice: fromPrice?.toString() || '0', // 기본값 0
          toPrice: toPrice?.toString() || '10000000', // 기본 최대값
          // fromArea: fromArea?.toString() || '0', // 기본값 0
          // toArea: toArea?.toString() || '100', // 기본 최대값
        }).toString();

        console.log("필터링된 데이터 호출 URL:", `/api/houseinfos/range?${queryParams}`);

        // API 요청
        const response = await apiClient.get(`/api/houseinfos/range?${queryParams}`);
        this.houseInfos = response.data.data; // 데이터를 상태에 저장
        console.log("필터링된 데이터:", response.data.data);
      } catch (error) {
        console.error('필터링된 데이터를 가져오는데 실패했습니다.', error);
      }
    },




  },
});
