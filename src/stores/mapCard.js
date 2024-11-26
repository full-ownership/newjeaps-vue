import { defineStore } from 'pinia';
import axios from 'axios';
import apiClient from '@/api'; // 위에서 만든 axios 인스턴스를 import

export const useHouseInfoStore = defineStore('houseInfo', {

  state: () => ({
    houseInfos: { data: [] }, // 상태 정의 (초기값)
    houseDeals: { data: [] },
    houseNames: { data: [] }, // 거래 정보를 저장할 상태 추가 // 거래 정보를 저장할 상태 추가
  }),
  actions: {
    async fetchHouseInfo(params) {
      try {
        console.log("fetchHousdeInfo 동작시도")
        const queryParams = new URLSearchParams(params).toString(); // 쿼리 문자열 생성
        const endpoint = `/api/house-info/range?${queryParams}`;
        // API 요청
        console.log(endpoint)
        const response = await apiClient.get(endpoint);
        this.houseInfos = response.data.data;
        console.log("응답 데이터:", response.data.data);
        //console.log(response.data.data);
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      }
    }
     ,

    // 필터링된 데이터를 가져오는 메서드
    async fetchFilteredHouseInfo({
      buildingUse,
      fromPrice,
      toPrice,
      fromArea,
      toArea,
      fromConstructYear,
      toConstructYear,
      // fromFloor,
      // toFloor,
     }) {
      try {
        // URL 쿼리 파라미터를 생성
        const queryParams = new URLSearchParams({
          buildingUse:buildingUse,
          fromPrice: fromPrice?.toString() || '0', // 기본값 0
          toPrice: toPrice?.toString() || '10000000', // 기본 최대값
          fromArea: fromArea?.toString() || '0', // 기본값 0
          toArea: toArea?.toString() || '100', // 기본 최대값
          fromConstructYear: fromConstructYear?.toString() || '1990', // 기본 최대값
          toConstructYear: toConstructYear?.toString() || '2024', // 기본 최대값
          // fromFloor: fromFloor?.toString() || '0', // 기본 최대값
          // toFloor: toFloor?.toString() || '40', // 기본 최대값
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

      //---------------------------------------------------------
      // 특정 aptSeq로 거래 정보를 가져오는 메서드
      // 특정 aptSeq로 거래 정보를 가져오는 메서드
      async fetchHouseDeals(aptSeq) {
        try {
          const endpoint = `/api/house-info/deals/${aptSeq}`;
          console.log(endpoint)
          // API 호출
          const response = await apiClient.get(endpoint);
    
          this.houseDeals = response.data.data; // 응답 데이터를 상태에 저장
          console.log("거래 정보 데이터:", response.data.data);
        } catch (error) {
          console.error("거래 정보를 가져오는데 실패했습니다:", error);
        }
      }
,
      async fetchHouseNames() {
        try {
          const endpoint = `/api/house-info/building-name`;
          console.log('이름 가져오는 맵카드');
          console.log(endpoint)
          // API 호출
          const response = await apiClient.get(endpoint);
          this.houseNames = response.data.data; // 응답 데이터를 상태에 저장
          console.log("이름데이터 ", response.data.data);

        } catch (error) {
          console.error("이름데이터를 가져오는데 실패했습니다:", error);
        }
      }
    



  },
});