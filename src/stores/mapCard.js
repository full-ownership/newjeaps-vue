import { defineStore } from 'pinia';
import axios from 'axios';

export const useHouseInfoStore = defineStore('houseInfo', {
  state: () => ({
    houseInfos: { data: [] }, // 초기 상태 설정
  }),
  actions: {
    async fetchHouseInfo(type) {
      try {
        const response = await axios.get(`http://localhost:8080/api/houseinfos/${type}`);

        // 응답이 정상적으로 왔는지 확인
          this.houseInfos = response.data.data;
          //console.log(this.houseInfos.data[0].buildingUse); // 데이터가 존재할 때만 접근
          console.log(response.data)
          
      } catch (error) {
        console.log('데이터를 가져오는데 실패했습니다.', error);
      }
    },
  },
});