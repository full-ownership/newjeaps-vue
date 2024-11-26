<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { ref, onMounted, computed, watch, reactive } from "vue";
import axios from "axios";
import { useHouseInfoStore } from "@/stores/mapCard";
import CardView from "./CardView.vue";
import "vue-range-slider/dist/vue-range-slider.css";
import RangeSlider from "vue-simple-range-slider";
import "vue-simple-range-slider/css";
import { useRoute, useRouter } from 'vue-router';

const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};

const map = ref(null); // Kakao Map 객체
const polygons = ref([]); // 생성된 폴리곤 객체 배열
const overlays = ref([]); // 생성된 오버레이 객체 배열
const activePolygon = ref(null); // 현재 활성화된 폴리곤
const level = ref(12); // 현재 줌 레벨
const detailMode = ref(""); // 현재 디테일 모드 ("do" 또는 "sig")
const centerData = ref({}); // 센터 데이터를 저장할 객체

// Center 데이터 로드
const loadCenterData = async () => {
  try {
    const response = await axios.get("/center.json");
    centerData.value = response.data;
    console.log("Loaded center.json:", centerData.value);
  } catch (error) {
    console.error("Error loading center.json:", error);
  }
};
const sigData = ref({}); // 시/군/구 경계 데이터 저장

const loadSigData = async () => {
  try {
    const response = await axios.get("/sig.json");
    sigData.value = response.data;
    console.log("Loaded sig.json:", sigData.value);
  } catch (error) {
    console.error("Error loading sig.json:", error);
  }
};

// Kakao Map 초기화 및 이벤트 바인딩
const onLoadKakaoMap = async (mapRef) => {
  map.value = mapRef;
  console.log("Kakao Map Loaded:", map.value);

  // 초기 로딩 시 sido.json으로 도 경계선 로드
  await init("/sido.json");


  // 초기 로딩 시 광역시/도 데이터 로드
  await loadPolygonData("/sido.json");


  // 줌 레벨 변경 이벤트
  kakao.maps.event.addListener(map.value, "zoom_changed", async () => {
    level.value = map.value.getLevel();
    console.log("Zoom level changed:", level.value);

    if (level.value > 10 && detailMode.value !== "do") {
      detailMode.value = "do";
      removePolygon();
      removeOverlays();
      await loadPolygonData("/sido.json"); // 광역시/도 데이터 로드
    } else if (level.value <= 10 && detailMode.value !== "sig") {
      detailMode.value = "sig";
      removePolygon();
      removeOverlays();

      // 시/군/구 데이터 로드 및 오버레이 추가
      Object.entries(centerData.value).forEach(([areaName, areaData]) => {
  if (areaData.districts) {
    Object.entries(areaData.districts).forEach(([districtName, coords]) => {
      console.log(`Adding overlay for district: ${districtName} at coords:`, coords);

      const content = document.createElement("div");
      content.innerHTML = `
        <div style="padding:8px 16px; background:#fff; border:2px solid #5995ed; border-radius:25px; color:#5995ed; font-size:12px; font-weight:600; cursor:pointer;">
          ${districtName}
        </div>
      `;

      const districtOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(coords.lat, coords.lng),
        content: content,
        clickable: true, // 오버레이 클릭 가능 옵션 활성화
        map: map.value,
      });

      overlays.value.push(districtOverlay);

      // 오버레이 클릭 이벤트 디버깅
      content.addEventListener("click", () => {
        console.log(`${districtName} clicked!`);
        const overlayPosition = new kakao.maps.LatLng(coords.lat, coords.lng);

        // 맵 이동 및 줌 레벨 감소
        map.value.panTo(overlayPosition);
        map.value.setLevel(map.value.getLevel() - 2); // 줌 레벨 감소

        // 기존 폴리곤 제거 후 새 폴리곤 생성
        removePolygon();
        displayDistrictPolygon(districtName, areaData.districts[districtName]);
      });
    });
  }
});
    }
  });
};

// JSON 데이터 기반 폴리곤 초기화
const loadPolygonData = async (path) => {
  try {
    const response = await axios.get(path);
    const geojson = response.data;

    const areas = geojson.features.map((unit) => {
      const coordinates = unit.geometry.coordinates[0];
      const name = unit.properties.SIG_KOR_NM;
      const path = coordinates.map((coord) => new kakao.maps.LatLng(coord[1], coord[0]));
      return { name, path };
    });

    areas.forEach(displayPolygon);
  } catch (error) {
    console.error(`Error loading JSON from ${path}:`, error);
  }
};

// 폴리곤 생성 및 이벤트 등록
const displayPolygon = (area) => {
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

  const center = centerData.value[area.name]?.center;

  if (!center) return;

  const overlay = new kakao.maps.CustomOverlay({
    position: new kakao.maps.LatLng(center.lat, center.lng),
    content: `<div style="padding:8px 16px; background:#fff; border:2px solid #5995ed; border-radius:25px; color:#5995ed; font-size:14px; font-weight:600;">
      ${area.name}
    </div>`,
    map: map.value,
  });

  overlays.value.push(overlay);

  // 폴리곤 및 오버레이 이벤트 등록
  kakao.maps.event.addListener(polygon, "mouseover", () => {
    if (activePolygon.value !== polygon) {
      polygon.setOptions({ fillColor: "#5995ed" });
    }
  });

  kakao.maps.event.addListener(polygon, "mouseout", () => {
    if (activePolygon.value !== polygon) {
      polygon.setOptions({ fillColor: "#fff" });
    }
  });

  kakao.maps.event.addListener(polygon, "click", () => {
    console.log(`${area.name} clicked!`);
    map.value.panTo(new kakao.maps.LatLng(center.lat, center.lng));
    map.value.setLevel(9);

    if (activePolygon.value) {
      activePolygon.value.setOptions({ fillColor: "#fff" });
    }

    activePolygon.value = polygon;
    polygon.setOptions({ fillColor: "#ffcccb" });
  });
};

const displayDistrictPolygon = (name, coords) => {
  console.log(`Creating polygon for district: ${name}`);
  console.log(`Coordinates received:`, coords); // coords 디버깅

  // coords가 올바른 배열인지 확인
  if (!coords || !Array.isArray(coords) || coords.length === 0) {
    console.error(`Invalid coordinates for district: ${name}`);
    return;
  }

  // Kakao LatLng 객체로 변환
  const path = coords.map(coord => new kakao.maps.LatLng(coord.lat, coord.lng));

  const polygon = new kakao.maps.Polygon({
    path,
    strokeWeight: 2,
    strokeColor: "#ff3333",
    fillColor: "#ffcccb",
    fillOpacity: 0.7,
  });

  polygon.setMap(map.value);
  polygons.value.push(polygon);

  console.log(`Polygon created for district: ${name}`);
};

// 폴리곤 및 오버레이 제거
const removePolygon = () => {
  polygons.value.forEach((polygon) => polygon.setMap(null));
  polygons.value = [];
};

const removeOverlays = () => {
  overlays.value.forEach((overlay) => overlay.setMap(null));
  overlays.value = [];
};

// Center 데이터 로드
onMounted(async () => {
  await loadCenterData();
});

// 필터 버튼
const filters = ["가격", "면적", "사용승인일", "층수"];

/* 데이터 부르는 곳  */
const route = useRoute();
// Pinia store 사용
const houseInfoStore = useHouseInfoStore();

// 데이터를 가져오는 함수
const fetchData = async (params) => {
  console.log("fetchData 호출됨:", params);
  await houseInfoStore.fetchHouseInfo(params);
};

onMounted(async () => {
 
  console.log(route.params);
  console.log("Route query:", route.query);
  console.log("onMounted 시작")

  await fetchData(route.query); // 데이터 로드

  await houseInfoStore.fetchHouseNames();
  
  console.log('이름')
  // console.log(houseInfoStore.houseNames.data)
});

// watch(
//   () => houseInfoStore.houseInfos,
//   (newValue) => {
//     console.log("houseInfos 상태 변경:", newValue); // 상태 변경 확인
//   },
//   { immediate: true } // 즉시 실행
// );

// watch(
//   () => houseInfoStore.houseNames, // Pinia 상태를 감지
//   (newValue) => {
//     console.log("houseNames 상태 변경:", newValue);
//   },
//   { immediate: true }
// );


const houseInfos = computed(() => houseInfoStore.houseInfos);



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
  가격: [0, 10000000],
  면적: [0,200],
  사용승인일: [1990, 2024],
  층수: [0, 40],
  검색어:''
});

const search = () => {
console.log(state.검색어)
console.log('검색어')
applyFilter1()
 }

const isSliderVisible = ref(""); // 현재 열려 있는 슬라이더 필터 이름

const toggleSlider = (filter) => {
  if (isSliderVisible.value === filter) {
    // 이미 열려 있는 슬라이더를 클릭하면 닫음
    isSliderVisible.value = "";
  } else {
    isSliderVisible.value = filter;
  }
};

const applyFilter1 = async() => {

  const query1 = { buildingUse: '아파트', 
                  fromArea: state.면적[0],
                  toArea:state.면적[1],
                   keyword:state.검색어 }
  
  const queryString1 = new URLSearchParams(query1).toString();

  await fetchData(queryString1); // 데이터 로드

};

const initFilter = () => {
  for (const [key, value] of Object.entries(state)) {
    value[0] = 0;
    value[1] = 10000000;
    console.log(`${key}: ${value[0]} ~ ${value[1]}`);
  }
}
const router = useRouter();
const navigateTo = (param) => {
  router.push({ name: 'map', params: { param } }); // 이름과 params를 명확히 지정
};


//*상세 정보 불러오는 곳
const selectedHouse = ref(null); // 반드시 ref로 선언

watch(
  () => selectedHouse.value,
  (newValue) => {
    console.log("selectedHouse 변경됨:", newValue);
    // 추가 작업이 필요하면 여기에 작성
  }
);

const handleCardClick = (house) => {
  selectHouse(house); // 선택된 house 설정
  findDealsByAptseq(house.aptSeq); // aptSeq로 거래 정보 가져오기
};

const selectHouse = (house) => {
  selectedHouse.value = house;
};



const findDealsByAptseq = async (aptSeq) => {
  try {
    console.log(`Fetching deals for aptSeq: ${aptSeq}`);
    const deals = await houseInfoStore.fetchHouseDeals(aptSeq); // Pinia 스토어 호출
    if (deals) {
      selectedHouse.value = deals; // selectedHouse에 API 결과 저장
      console.log("거래 정보 업데이트 완료:", selectedHouse.value);
    } else {
      console.log("거래 정보가 없습니다.");
    }
  } catch (error) {
    console.error("거래 정보를 가져오는데 실패했습니다:", error);
  }
};

const closeDetailView = () => {
  selectedHouse.value = null;
};

//검색어 자동완성

class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let node = this.root;
      for (const char of word) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.isEndOfWord = true;
    }
  
    search(prefix) {
      let node = this.root;
      for (const char of prefix) {
        if (!node.children[char]) {
          return [];
        }
        node = node.children[char];
      }
      return this._collectWords(node, prefix);
    }
  
    _collectWords(node, prefix) {
      const results = [];
      if (node.isEndOfWord) {
        results.push(prefix);
      }
      for (const [char, childNode] of Object.entries(node.children)) {
        results.push(...this._collectWords(childNode, prefix + char));
      }
      return results;
    }
  }
  
const houseNames = ref([]);
const searchQuery = ref("");
const filteredNames = ref([]);

const trie = new Trie();
onMounted(async () => {
  const houseInfoStore = useHouseInfoStore();
  await houseInfoStore.fetchHouseNames(); // Pinia에서 데이터 가져오기
  houseNames.value = Array.isArray(houseInfoStore.houseNames?.data)
  ? houseInfoStore.houseNames.data
  : [];

  
  // 트라이에 이름 삽입
  console.log("트라이가 생성전", trie);
  console.log('houseNames.value의 타입:', Array.isArray(houseNames.value) ? '배열' : typeof houseNames.value);
  console.log('houseNames.value의 타입:', Array.isArray(houseNames.value) ? '배열' : typeof houseNames.value);
  for (const house of houseNames.value) {
   if (house?.aptNm) { // aptNm이 존재하는지 확인
    trie.insert(house.aptNm);
    console.log(`삽입된 이름: ${house.aptNm}`);
  } else {
    console.warn("aptNm이 없는 데이터:", house);
  }
  }

  console.log("트라이가 생성되었습니다:", trie);
});

// 검색 처리
const updateSearchResults = () => {
  console.log('검색처리중')
  if (!searchQuery.value || searchQuery.value.trim() === "") {
    filteredNames.value = [];
    console.log("검색어가 비어 있습니다.");
    return;
  }

  filteredNames.value = trie.search(searchQuery.value.trim());
  console.log("검색 결과:", JSON.stringify(filteredNames.value)); // 일치하는 결과 콘솔 출력
};

</script>

<template>
  <div class="flex flex-row items-center w-full h-[100vh] overflow-hidden ">
    <!-- 지도 및 필터 영역 -->
    <div class="flex flex-col justify-start w-full h-full mt-40">
      <!-- 필터 전체 버튼 -->
      <div class="flex flex-row items-center py-4 h-14 border-b border-gray-200 z-100">
        <!--검색 창-->
        <div class="relative w-[370px] ml-4 mr-2">
          <input
            v-model="searchQuery" 
            type="text"
            @input="updateSearchResults"
            placeholder="찾고자하는 아파트 이름을 입력하세요"
            class="w-full h-8 px-4 pr-10 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
          <button
            type="button"
            class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
            @click="search">
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
          <!-- 검색 결과 -->
          <div v-if="filteredNames.length > 0">
            <p>검색 결과:</p>
            <ul>
              <li v-for="(name, index) in filteredNames" :key="index">
                {{ name }}
              </li>
            </ul>
          </div>
          <div v-else>
            <p>일치하는 결과가 없습니다.</p>
          </div>
        </div>

        <div class="relative inline-block text-left ml-2">
        <!-- 버튼 -->
        <button
          type="button"
          @click="toggleSlider('filter1')"
          class="flex flex-row items-center w-full h-8 border border-gray-300 shadow-sm pl-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          <div>가격</div>
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
          v-if="isSliderVisible === 'filter1'"
          class="absolute z-20 w-[220px] h-[100px] bottom-10 left-0 border-2 border-gray-200 bg-pink-200">
          <RangeSlider
            v-model="state['가격']"
            style="width: 100%"
            exponential
            :max="1000000">
            <template #suffix>만원</template>
          </RangeSlider>
          <div class="flex flex-row justify-end">
            <button class="bg-blue-600 rounded-lg mb-2 mx-2 p-2 text-white text-xs" @click="applyFilter1">
              적용
            </button>
          </div>
        </div>
      </div>

        <div class="relative inline-block text-left ml-2">
          <!-- 버튼 -->
          <button
            type="button"
            @click="toggleSlider('filter2')"
            class="flex flex-row items-center w-full h-8 border border-gray-300 shadow-sm pl-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
            <div>면적</div>
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
            v-if="isSliderVisible === 'filter2'"
            class="absolute z-20 w-[220px] h-[100px] bottom-10 left-0 border-2 border-gray-200 bg-pink-200">
            <RangeSlider
              v-model="state['면적']"
              style="width: 100%"
              exponential
              :max="1000000">
              <template #suffix>만원</template>
            </RangeSlider>
            <div class="flex flex-row justify-end">
              <button class="bg-blue-600 rounded-lg mb-2 mx-2 p-2 text-white text-xs" @click="applyFilter1">
                적용
              </button>
            </div>
          </div>
        </div>

<!-- 필요한 필터 수 만큼 반복 -->

        
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
          <div class="p-2 overflow-y-auto">
            <div class="text-center ">
              <div v-for="name in houseNames" :key="name.aptSeq">
                {{ name.aptNm }}
              </div>
          </div>
              <div v-for="house in houseInfos" :key="house.id">
                <CardView
                :jibun="house.jibun"
                :imgUrl="house.imgUrl"
                :buildingUse="house.buildingUses"
                :id="house.aptSeq"
                :buildingName="house.aptNm"
                :districtName="house.gugunName"
                :legalName="house.dongName"
                :minPropertyPrice="house.minPrice"
                :maxPropertyPrice="house.maxPrice"
                @click="handleCardClick(house)" 
                />
                 <!-- 오른쪽 뷰 -->
          <div
            v-if="selectedHouse?.aptSeq === house.aptSeq"
            class="absolute bottom-50 left-400 bg-gray-100 p-4 shadow-lg transition duration-300 w-[360px] z-100 h-[100%] overflow-y-auto"
            style="left: 400px; top: 100px;">
            <ul>
              {{ house.aptNm }}
              {{ house.minPrice }}
              {{ house.maxPrice }}
              {{ house.minFloor }}
              {{ house.maxFloor }}
              <li
                v-for="(deal, index) in selectedHouse"
                :key="`${deal.dealYear}-${deal.dealMonth}-${deal.dealDay}-${index}`"
                class="mb-4 border-b pb-2">
                <p>{{ deal.dealYear }}년 {{ deal.dealMonth }}월 {{ deal.dealDay }}일</p>

              </li>
            </ul>
       
            <!-- 닫기 버튼 -->
            <button
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              @click="closeDetailView">
              닫기
            </button>
          </div>
              </div>
          </div>
         
        </div>

        <!-- 지도 표시 영역 -->
        <div class="relative w-full bg-purple-100">
          <!-- 카카오 맵 -->
          <KakaoMap
            :lat="36.866826"
            :lng="127.7786567"
            :level="12"
            @onLoadKakaoMap="onLoadKakaoMap"
            style="width: 100%; height: 100%;"
            class="absolute z-10 ">
            <div v-for="house in houseInfos" :key="house.id">
              <KakaoMapMarker
                :lat="parseFloat(house.latitude)"
                :lng="parseFloat(house.longitude)">
              </KakaoMapMarker>
            </div>
          </KakaoMap>
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
div {
  pointer-events: auto; /* 오버레이가 클릭 가능하도록 */
  z-index: 1000; /* 오버레이가 다른 요소 위에 표시되도록 */
}
</style>