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
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          this.houseInfos = response.data;
          //console.log(this.houseInfos.data[0].buildingUse); // 데이터가 존재할 때만 접근
          
          const valueArray = this.houseInfos.data.map(item => item.value);
          console.log(valueArray);
        } else {
          console.error('빈 데이터 또는 잘못된 데이터 구조:', response.data);
        }
      } catch (error) {
        console.log('데이터를 가져오는데 실패했습니다.', error);
      }
    },
  },
});
