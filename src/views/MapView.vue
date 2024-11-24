<script setup>
import { KakaoMap } from "vue3-kakao-maps";
import { ref, onMounted, computed, watch, reactive } from "vue";
import axios from "axios";
import { useHouseInfoStore } from "@/stores/mapCard";
import CardView from "./CardView.vue";
import Button from "@/Component/Button/Button.vue";
import "vue-range-slider/dist/vue-range-slider.css";
import RangeSlider from "vue-simple-range-slider";
import "vue-simple-range-slider/css";
import { useRoute } from 'vue-router';


const map = ref(null); // Kakao Map 객체
const polygons = ref([]); // 생성된 폴리곤 객체 배열
const overlays = ref([]); // 생성된 오버레이 객체 배열
const level = ref(12); // 현재 줌 레벨
const detailMode = ref(""); // 어떤 경계를 보여줄지 (도, 시, 구)
const isLoading = ref(true); // 로딩 상태 플래그

const onLoadKakaoMap = async (mapRef) => {
  map.value = mapRef;
  console.log("Kakao Map Loaded:", map.value);

  // 초기 로딩 시 sido.json으로 도 경계선 로드
  await init("/sido.json");

  kakao.maps.event.addListener(map.value, "zoom_changed", async () => {
    level.value = map.value.getLevel();
    console.log("Zoom level changed:", level.value);

    // 줌 레벨 10 이상이면 도 경계 (sido.json)로 로드, 10 미만이면 시/구 경계 (sig.json)
    if (level.value >= 10) {
      if (detailMode.value !== "do") {
        detailMode.value = "do";
        removePolygon();  // 기존 폴리곤 제거
        removeOverlays(); // 기존 오버레이 제거
        await init("/sido.json");  // 도 경계로 변경
      }
    } else {
      if (detailMode.value !== "sig") {
        detailMode.value = "sig";
        removePolygon();  // 기존 폴리곤 제거
        removeOverlays(); // 기존 오버레이 제거
        await init("/sig.json");  // 시/구 경계로 변경
      }
    }
  });
};

// 폴리곤 초기화 함수
const init = async (path) => {
  try {
    console.log("Fetching JSON from:", path);
    const response = await axios.get(path);
    const geojson = response.data;

    console.log("Loaded JSON:", geojson);

    // JSON 데이터를 기반으로 폴리곤 생성
    const areas = geojson.features.map((unit) => {
      const coordinates = unit.geometry.coordinates[0];
      const name = unit.properties.SIG_KOR_NM; // 도 이름
      const cd_location = unit.properties.SIG_CD;

      const path = coordinates.map(
        (coord) => new kakao.maps.LatLng(coord[1], coord[0])
      );

      return { name, path, location: cd_location };
    });

    console.log("Parsed Areas:", areas);

    // 각 경계에 대해 폴리곤 생성 및 중앙에 오버레이 추가
    areas.forEach(displayArea);
  } catch (error) {
    console.error(`Error loading JSON from ${path}:`, error);
  }
};

// 폴리곤 생성 및 지도에 표시
const displayArea = (area) => {
  const polygon = new kakao.maps.Polygon({
    path: area.path,
    strokeWeight: 2,
    strokeColor: "#5995ed",
    strokeOpacity: 0.8,
    fillColor: "#fff",
    fillOpacity: 0.5,
  });

  polygon.setMap(map.value);
  polygons.value.push(polygon);

  console.log(`Polygon created for area: ${area.name}`);

  // 중심 좌표 계산
  const calculateCenter = (coordinates) => {
    let totalLat = 0;
    let totalLng = 0;

    coordinates.forEach((coord) => {
      totalLat += coord.getLat();
      totalLng += coord.getLng();
    });

    const centerLat = totalLat / coordinates.length;
    const centerLng = totalLng / coordinates.length;

    return new kakao.maps.LatLng(centerLat + 0.1, centerLng); // 약간의 오프셋을 주어 정확한 중심을 맞춤
  };

  // 폴리곤의 중앙 좌표 계산
  const center = calculateCenter(area.path);

  // 오버레이 생성
  const customOverlay = new kakao.maps.CustomOverlay({
    position: center, // 오버레이 위치는 계산된 중심
    content: `<div style="padding:8px 16px; background:#fff; border:2px solid #5995ed; border-radius:25px; color:#5995ed; font-size:14px; font-weight:600; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      ${area.name}
    </div>`,
    map: map.value,
  });

  overlays.value.push(customOverlay); // 오버레이 배열에 추가

  // 이벤트 설정
  kakao.maps.event.addListener(polygon, "mouseover", () => {
    polygon.setOptions({ fillColor: "#5995ed" });
  });

  kakao.maps.event.addListener(polygon, "mouseout", () => {
    polygon.setOptions({ fillColor: "#fff" });
  });

  kakao.maps.event.addListener(polygon, "click", () => {
    console.log(`${area.name} clicked!`);
    if (map.value) {
      // 중심 좌표로 지도 이동 및 줌 레벨 변경
      map.value.panTo(center);
      map.value.setLevel(map.value.getLevel() - 3); // 최소 레벨 1로 제한
    } else {
      console.error("Map object is not initialized.");
    }
  });
};

// 폴리곤 제거
const removePolygon = () => {
  polygons.value.forEach((polygon) => polygon.setMap(null));
  polygons.value = [];
};

// 오버레이 제거
const removeOverlays = () => {
  overlays.value.forEach((overlay) => overlay.setMap(null));
  overlays.value = [];
};

// 필터 버튼
const filters = ["가격", "면적", "사용승인일", "층수"];

// Pinia store 사용
const houseInfoStore = useHouseInfoStore();

// 데이터를 가져오는 함수
const fetchData = async (type) => {
  console.log("동작!");
  await houseInfoStore.fetchHouseInfo(type); // API 호출하여 데이터 가져오기
  console.log("동작2");
  
};

const route = useRoute();
// params로 전달된 "param" 값


// 문자열로 변환된 buildingUse
const buildingUse = route.params.param;

console.log('전달된 파라미터:', buildingUse); // 디버깅용

onMounted(async () => {
  isLoading.value = false;
  await fetchData(buildingUse); // 데이터 로드
  isLoading.value = true;
});

watch(
  () => houseInfoStore.houseInfos,
  (newValue) => {
    console.log("houseInfos 상태 변경:", newValue); // 상태 변경 확인
  },
  { immediate: true } // 즉시 실행
);

// store에서 houseInfos 가져오기
const houseInfos = computed(() => houseInfoStore.houseInfos);

// DOMContentLoaded 이벤트는 HTML 문서의 모든 콘텐츠가 완전히 로드되었을 때 발생함
document.addEventListener("DOMContentLoaded", () => {

  const filterButton = document.getElementById("filterButton");
  const rangeSlider = document.getElementById("rangeSlider");

  // 이제 filterButton이 존재하므로 이벤트 리스너를 안전하게 추가할 수 있습니다.
  filterButton.addEventListener("click", () => {
    if (rangeSlider.classList.contains("hidden")) {
      rangeSlider.classList.remove("hidden");
    } else {
      rangeSlider.classList.add("hidden");
    }
  });
});

const state = reactive({
  가격: [0, 10000000], // 초기값
  면적: [0, 10000000],
  사용승인일: [1990, 2024],
  층수: [0, 33],
});

const isSliderVisible = ref(""); // 현재 열려 있는 슬라이더 필터 이름

const toggleSlider = (filter) => {
  if (isSliderVisible.value === filter) {
    // 이미 열려 있는 슬라이더를 클릭하면 닫음
    isSliderVisible.value = "";
  } else {
    // 다른 슬라이더를 클릭하면 현재 슬라이더를 열고, 나머지는 닫음
    isSliderVisible.value = filter;
  }
};

const applyFilter = async() => {
  for (const [key, value] of Object.entries(state)) {
    console.log(`${key}: ${value[0]} ~ ${value[1]}`);
    //console.log(`${value[0]}`)
    // 필터링 조건 구성
    const filterParams = {// 전달된 param 값
    buildingUse,
    fromPrice:state["가격"][0], // "가격"의 최소값
    toPrice:state["가격"][1],
    //fromArea:state["면적"][0],
    //toArea:state["면적"][1], // "가격"의 최대값
    // fromConstructYear:state['사용승인일'][0],
    // toConstructYear:state['사용승인일'][1],
    // fromFloor:state['사용승인일'][0],
    // toFloor:state['층수'][1],
  };

  console.log("필터 파라미터:", filterParams);

   // Pinia store의 fetchFilteredHouseInfo 호출
   try {
    isLoading.value = true; // 로딩 시작
    await houseInfoStore.fetchFilteredHouseInfo(filterParams); // 비동기 작업
    isLoading.value = false; // 로딩 종료
  } catch (error) {
    console.error("필터 적용 중 에러:", error);
    isLoading.value = false; // 로딩 실패 시에도 종료
  }

  }
};

const initFilter = () => {
  for (const [key, value] of Object.entries(state)) {
    value[0] = 0;
    value[1] = 10000000;
    console.log(`${key}: ${value[0]} ~ ${value[1]}`);
    //console.log(`${value[0]}`)
  } 
}

</script>

<template>
  <div class="flex flex-row items-center w-full h-[100vh] pt-20">
    <!-- 버튼 영역 -->
    <div class="bg-white w-20 h-full font-PretendardRegular text-xs border-r border-gray-200">

      <Button></Button>

      <div class="flex flex-col mx-auto mt-2 w-16 h-16 bg-white rounded-lg items-center justify-center text-gray-800 hover:bg-gray-100 active:bg-pink-100 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <p class="pt-1">아파트</p>
      </div>

      <div class="flex flex-col mx-auto mt-2 w-16 h-16 bg-blue-500 rounded-lg items-center justify-center text-white shadow-md active:shadow-lg cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <p class="pt-1">연립 다세대</p>
      </div>

      <div class="flex flex-col mx-auto mt-2 w-16 h-16 bg-blue-500 rounded-lg items-center justify-center text-white shadow-md active:shadow-lg cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <p class="pt-1">단독/다가구</p>
      </div>

      <div class="flex flex-col mx-auto mt-2 w-16 h-16 bg-blue-500 rounded-lg items-center justify-center text-white shadow-md active:shadow-lg cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <p class="pt-1">오피스텔</p>
      </div>
    </div>

    <!-- 지도 및 필터 영역 -->
    <div class="flex flex-col justify-start w-full h-full">
      <!-- 필터 전체 버튼 -->
      <div class="flex flex-row items-center py-4 h-14 border-b border-gray-200">
        <!--검색 창-->
        <div class="relative w-[370px] ml-4 mr-2">
          <input
            type="text"
            placeholder="찾고자하는 아파트 이름을 입력하세요"
            class="w-full h-8 px-4 pr-10 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
          <button
            type="button"
            class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700">
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </button>
        </div>

      <div v-for="(filter, index) in filters" :key="index" class="relative inline-block text-left ml-2">
        <!-- 버튼 -->
        <button
          type="button"
          @click="toggleSlider(filter)"
          class="flex flex-row items-center w-full h-8 border border-gray-300 shadow-sm pl-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          <div>{{ filter }}</div>
          <svg
            class="h-4 w-6 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <!-- 슬라이더 -->
        <div
          v-if="isSliderVisible === filter"
          class="absolute z-10 w-[220px] top-10 left-0 border-2 border-gray-200 bg-white" >
          <RangeSlider
            v-model="state[filter]"
            style="width: 100%"
            exponential
            :max="1000000"
            
            >
            <template #suffix>만원</template>
          </RangeSlider>
          <div class="flex flex-row justify-end">
            <button class="bg-blue-600 rounded-lg mb-2 mx-2 p-2 text-white text-xs" @click=applyFilter >
              적용
            </button>
          </div>
          <!-- <div class="flex flex-row justify-between bg-blue-400 px-4">
            <span class="">{{ state[filter][0] }}만원</span>
            <span class="">{{ state[filter][1] }}만원</span>
          </div> -->
        </div>
      </div>
        <button type="button" class="relative inline-block text-left ml-2 h-8 px-2 py-2 bg-white border border-gray-300 shadow-sm focus:ring-indigo-500">
          <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" @click="initFilter">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
          </svg>
        </button>

      </div>
      <!-- 리스트와 지도 영역 -->
      <div class="flex flex-row h-full font-Pretendard text-gray-600">
        <div class="flex flex-col h-full rounded-lg">
          <div class="flex flex-row p-2 text-s bg-blue-100">
            <p class="mr-1 ml-2 cursor-pointer font-bold">인기순</p>
            <p class="mr-1 cursor-pointer font-bold">가격순</p>
            <p class="mr-1 cursor-pointer font-bold">면적순</p>
            <FilterButton></FilterButton>
          </div>
          <!-- 목록 영역 추가할 수 있습니다 -->
          <div class="p-2 overflow-auto">
            <div class="text-center mt-2">
          </div>
              <div v-for="house in houseInfos" :key="house.id">
                <CardView
                :id="house.id"
                :buildingUse="house.buildingUse"
                :buildingName="house.buildingName"
                :districtName="house.districtName"
                :legalName="house.legalName"
                :minPropertyPrice="house.minPropertyPrice"
                :maxPropertyPrice="house.maxPropertyPrice"
              />
              </div>
          </div>
        </div>

        <!-- 지도 표시 영역 -->
        <div class="relative w-full bg-purple-100">
          <KakaoMap
            :lat="36.866826"
            :lng="127.7786567"
            :level="12"
            @onLoadKakaoMap="onLoadKakaoMap"
            style="width: 100%; height: 100vh;"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<style>
.polygon-label {
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  font-size: 12px;
  color: #333;
  text-align: center;
  white-space: nowrap;
}
</style>
