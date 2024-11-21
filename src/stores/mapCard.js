import { defineStore } from 'pinia';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useHouseInfoStore = defineStore('houseInfo', {
  state: () => ({
    houseInfos: { data: [] } ,
  }),
  actions: {
    async fetchHouseInfo(type) {
      try {
 
        const response = await axios.get(`http://localhost:8080/api/houseinfos/${type}`);
        
        this.houseInfos.data = response.data.data;
        
         //아파트 출력
      } catch (error) {
        console.log('데이터를 가져오는데 실패했습니다.', error);
      }
    },
  },
});
