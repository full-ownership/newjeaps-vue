<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Props 정의
const props = defineProps({
  latitude: Number, // 위도
  longitude: Number, // 경도
});

const kakaoApiKey = "f33cead2772e90625f7ee617bcf79982"; // 카카오 REST API 키
const oliveYoungPlaces = ref([]); // 검색 결과 저장

// 올리브영 검색 함수
const searchOliveYoungNearby = async (latitude, longitude) => {
  try {
    console.log('latitude',latitude)
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json`;
    const params = {
      query: "약국", // 검색어
      x: longitude, // 경도
      y: latitude, // 위도
      radius: 1000, // 반경 1km
    };

    const headers = {
      Authorization: `KakaoAK ${kakaoApiKey}`, // 카카오 인증 헤더
    };

    const response = await axios.get(url, { headers, params });
    oliveYoungPlaces.value = response.data.documents; // 검색 결과 저장
  } catch (error) {
    console.error("카카오 API 호출 오류:", error);
    oliveYoungPlaces.value = []; // 오류 발생 시 초기화
  }
};

// Props가 변경될 때마다 검색 함수 호출
onMounted(async () => {
  if (props.latitude && props.longitude) {
    console.log("onMounted로 API 호출:", props.latitude, props.longitude);
    await searchOliveYoungNearby(props.latitude, props.longitude);
  }
});
</script>

<template>
    <span v-if="oliveYoungPlaces.length > 0" style="display: inline-block;" class="shadow-md">
      <img src="@/assets/icons/pharmacy.png" width="100%">
    </span>
</template>
