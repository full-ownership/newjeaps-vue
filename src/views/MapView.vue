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
import BarChart from "@/Component/BarChart.vue";

import SearchNearByOliveYoung from "@/Component/SearchNearBy/SearchNearByOliveYoung.vue";
import SearchNearByMcDonald from "@/Component/SearchNearBy/SearchNearByMcDonald.vue";
import SearchNearByPharmacy from "@/Component/SearchNearBy/SearchNearByPharmacy.vue";
import SearchNearByStarbucks from "@/Component/SearchNearBy/SearchNearByStarbucks.vue";

const goChat = (house) => {
  console.log("채팅버튼 선택")
  console.log(house.aptNm)
}



const map = ref(null); // Kakao Map 객체
const polygons = ref([]); // 생성된 폴리곤 객체 배열
const overlays = ref([]); // 생성된 오버레이 객체 배열
const activePolygon = ref(null); // 현재 활성화된 폴리곤
const level = ref(12); // 현재 줌 레벨
const detailMode = ref(""); // 현재 디테일 모드 ("do" 또는 "sig")
const centerData = ref({}); // 센터 데이터를 저장할 객체

const clickedArea = ref("");

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
      // console.log(`Adding overlay for district: ${districtName} at coords:`, coords);

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

  const overlayPosition = districtOverlay.getPosition(); // 오버레이의 위치 가져오기

  map.value.setCenter(overlayPosition);

// 줌 레벨 설정
  map.value.setLevel(4); // 줌 레벨 설정
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
  console.log(`Created overlay for ${area.name} with content:`, area.name);

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

  // 폴리곤 이름으로 오버레이 찾기
  const overlay = overlays.value.find((o) => {
    const overlayContent = o.getContent(); // HTML 노드 전체
    if (!overlayContent) {
      console.error(`Overlay content is undefined for area: ${area.name}`);
      return false;
    }

    // HTML 콘텐츠에서 텍스트 추출
    const overlayText = overlayContent.innerText?.trim(); // innerText를 사용
    console.log(`Checking overlay: "${overlayText}" against "${area.name}"`);
    return overlayText === area.name; // 텍스트 비교
  });

  if (overlay) {
    const overlayPosition = overlay.getPosition(); // 오버레이의 위치 가져오기
    console.log(`Setting center to overlay position: ${overlayPosition}`);
    map.value.setCenter(overlayPosition); // 지도 중심 이동
    map.value.setLevel(9); // 줌 레벨 설정
  } else {
    console.warn(`No overlay found for area: ${area.name}`);
  }

  // 폴리곤 색상 변경
  if (activePolygon.value) {
    activePolygon.value.setOptions({ fillColor: "#fff" });
  }

  activePolygon.value = polygon;
  polygon.setOptions({ fillColor: "#ffcccb" });
});

};

const displayDistrictPolygon = (name, coords) => {

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


});

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
  applyFilter()
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

const applyFilter = async() => {
  const query = { buildingUse: '아파트',
                  fromArea: state.면적[0],
                  toArea:state.면적[1],
                  keyword:state.검색어 }
  const queryString = new URLSearchParams(query).toString();
  await fetchData(queryString); // 데이터 로드
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
    // console.log(`Fetching deals for aptSeq: ${aptSeq}`);
    await houseInfoStore.fetchHouseDeals(aptSeq); // Pinia 스토어 호출

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
  for (const name of houseInfoStore.houseNames) {
   if (name?.aptNm) { // aptNm이 존재하는지 확인
    trie.insert(name.aptNm);
  } else {
    console.warn("aptNm이 없는 데이터:", name);
  }
  }
});

const updateSearchResults = () => {
  if (!searchQuery.value.trim()) {
    filteredNames.value = [];
    return;
  }

  const results = [];
  let node = trie.root;
  const prefix = searchQuery.value.trim();

  for (const char of prefix) {
    if (!node.children[char]) {
      filteredNames.value = []; // 검색어에 맞는 결과가 없으면 초기화
      return;
    }
    node = node.children[char];
  }

  // 결과를 최대 5개까지만 수집
  const collectWords = (currentNode, currentWord) => {
    if (results.length >= 5) return; // 5개를 찾으면 종료
    if (currentNode.isEndOfWord) {
      results.push(currentWord);
    }
    for (const [char, childNode] of Object.entries(currentNode.children)) {
      collectWords(childNode, currentWord + char);
    }
  };

  collectWords(node, prefix);
  filteredNames.value = results; // 결과 저장
};

const selectKeyword = (name) =>{
  searchQuery.value=name
}



</script>
<template>
  <div class="flex flex-row items-center w-full h-[100vh] overflow-hidden ">
    <!-- 지도 및 필터 영역 -->
    <div class="relative flex flex-col justify-start w-full h-full mt-40">
      <!-- 필터 전체 버튼 -->
      <div class="flex flex-row items-center py-4 h-14 border-b border-gray-200 z-100 relative">
         <!--검색 창-->
        <div class="w-[370px] ml-4 mr-2 relative justify-center">
          <input
            v-model="searchQuery"
            type="text"
            @input="updateSearchResults"
            placeholder="찾고자하는 아파트 이름을 입력하세요"
            class="w-full  h-8 px-4 pr-10 text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none "/>
          <button
            type="button"
            class="absolute flex justify-center right-0 top-2 px-3 text-gray-500 hover:text-gray-700"
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
        </div>
     <!-- 검색 결과 -->
        <div v-if="filteredNames.length > 0" class="absolute w-[360px] h-auto max-h-96 z-100 top-12 left-4 shadow-lg rounded-md border border-gray-300">
          <!-- 결과 없음 메시지 -->
          <div class="bg-white text-gray-700 px-4 py-2 font-semibold border-b border-gray-300">
            <ul>
            <li v-for="(name, index) in filteredNames"
              :key="index"
              class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              @click="selectKeyword(name)">
              {{ name }}
            </li>
          </ul>
          </div>
          <!-- 검색 결과 리스트 -->
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
      <div class="flex h-full font-Pretendard text-gray-600 z-10">
        <div class="flex flex-col h-full rounded-lg">
          <!-- 목록 영역 추가할 수 있습니다 -->
          <div class="p-2 ">
            <div class="flex flex-row p-2 text-s h-[24px] fixed bg-white z-20">
              <p class="mr-1 ml-2 cursor-pointer font-bold">인기순</p>
              <p class="mr-1 cursor-pointer font-bold">가격순</p>
              <p class="mr-1 cursor-pointer font-bold">면적순</p>
            </div>
            <div class="text-center ">
              <div v-for="name in houseNames" :key="name.aptSeq">
                {{ name.aptNm }}
              </div>
            </div>
            
            <div class="overflow-y-auto h-full mt-12 max-h-[80vh] bg-white">
              <div v-for="house in houseInfos" :key="house.id" class="z-10 ">
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
                  class="absolute z-100 top-[-100px] left-300 bg-white p-6 shadow-lg transition duration-300 w-[360px] h-[78%] overflow-y-auto
                  rounded-md shadow-lg"
                  style="left: 400px; top: 9vh;">
                  <div class="h-[30px] flex flex-row justify-end">
                    <button
                    class="text-gray-800 text-xs rounded h-[20px] w-[20px]"
                    @click="closeDetailView">
                    X
                  </button>
                  </div>
                  <div class="text-xl pl-2 font-PretendardSemiBold flex flex-row items-center w-full">
                    <!-- 아파트 이름 -->
                    <div class="flex-grow">
                      {{ house.aptNm }}
                    </div>
                    <!-- 하트 이모티콘 -->
                    <div class="heart-container flex flex-row items-center">
                      <button @click="toggleHeart" class="heart-button ">
                        <img src="@/assets/icons/heart.svg" width="20px">
                      </button>
                      <button class="pt-1">
                        <img src="@/assets/icons/chat_icon.png" width="20px" @click=goChat(house)>
                      </button>
                    </div>
                  </div>
                  <div class="text-2xl text-center text-PretendardSemiBold text-gray-800">
                    <img :src="house.imgUrl" alt="House Image" class="h-autoshadow-md mt-1" />
                  </div>
                  <div class="mt-4">
                    <div class="text-left text-lg font-PretendardSemiBold mb-1 flex flex-row">
                      <div class="text- border-b-4 px-2"> 단지정보</div>
                    </div>
                        <div class="flex flex-row mb-1 mt-2">
                          <span class="mr-2 ml-1">
                            <img src="@/assets/icons/location.png" width="20px">
                          </span>
                          <span >
                            {{ house.gugunName }}
                            {{ house.dongName }}
                            {{ house.jibun }}
                          </span>
                          </div>
                    <div class="flex flex-row mb-2">
                      <div class = "flex flex-row mr-2 ">
                      <span>
                        가격 &nbsp;
                      </span>
                        <div>
                      {{ house.minPrice }} | {{ house.maxPrice }}
                      </div>
                    </div>
                    <div class = "flex flex-row mr-2 ">
                      <span>
                        면적 &nbsp;
                      </span>
                        <div>
                      {{ house.minArea }} | {{ house.maxArea }}
                      </div>
                    </div>
                    <div class = "flex flex-row">
                      <span>
                        층고 &nbsp;
                      </span>
                        <div>
                      {{ house.maxFloor }} | {{ house.minFloor }}
                      </div>
                    </div>
                  </div>
                  </div>
                    <span class="text-left text-lg font-PretendardSemiBold mt-4 border-b-4 px-2 py-1">
                    거래정보
                    </span>

                    <table class="min-w-full border-collapse border border-gray-200 mt-4">
                    <thead>
                      <tr class="bg-blue-100 text-xs">
                        <th class="border border-gray-300 px-4 py-2 text-center">거래 일</th>
                        <th class="border border-gray-300 px-4 py-2 text-center">면적 (㎡)</th>
                        <th class="border border-gray-300 px-4 py-2 text-center">거래 금액(만원)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="deal in houseInfoStore.houseDeals"
                        :key="deal.id"
                        class="odd:bg-gray-50 even:bg-white text-sm">
                        <td class="border border-gray-300 px-4 py-2 text-center text-xs">{{ deal.dealYear }}.{{ deal.dealMonth }}.{{ deal.dealDay }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-xs">{{ deal.excluUseAr}} </td>
                        <td class="border border-gray-300 px-4 py-2 text-center text-xs">{{ deal.dealAmount}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-left text-lg font-PretendardSemiBold mt-4 mb-1 flex flex-row">
                      <div class="text-sm border-b-4 px-2"> 반경 1km 편의시설</div>
                    </div>
                  <div class="flex flex-row justify-evenly space-x-4 p-2">
                    <SearchNearByOliveYoung 
                    :longitude="parseFloat(house.longitude)"
                    :latitude="parseFloat(house.latitude)"/>

                    <SearchNearByMcDonald
                    :longitude="parseFloat(house.longitude)"
                    :latitude="parseFloat(house.latitude)"/>

                    <SearchNearByPharmacy
                    :longitude="parseFloat(house.longitude)"
                    :latitude="parseFloat(house.latitude)"/>

                    <SearchNearByStarbucks
                    :longitude="parseFloat(house.longitude)"
                    :latitude="parseFloat(house.latitude)"/>
                  </div>
               
                  <div>
                  </div>
                </div>
              </div>
              <!--여기 위치하기-->
            </div>
          </div>
        </div>
        <!-- 지도 표시 영역 -->
        <div class="w-full z-0">
          <!-- 카카오 맵 -->
          <KakaoMap
            :lat="36.866826"
            :lng="127.7786567"
            :level="12"
            @onLoadKakaoMap="onLoadKakaoMap"
            style="width: 100%; height: 100%;"
            class="absolute z-0 ">
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
