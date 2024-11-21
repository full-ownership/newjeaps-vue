<<<<<<< HEAD
<script setup>
import { KakaoMap } from 'vue3-kakao-maps';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useHouseInfoStore } from '@/stores/mapCard';

const map = ref(null); // Kakao Map 객체
const polygons = ref([]); // 생성된 폴리곤 객체 배열
const detailMode = ref(false); // 상세 모드 여부
const level = ref(12); // 현재 줌 레벨

// 지도 로드 시 실행되는 콜백
const onLoadKakaoMap = async (mapRef) => {
  map.value = mapRef;

  console.log('Kakao Map Loaded:', map.value);

  // 초기 JSON 데이터를 사용해 폴리곤 생성
  await init('/sido.json');

  // 줌 레벨 변경 이벤트 등록
  kakao.maps.event.addListener(map.value, 'zoom_changed', async () => {
    level.value = map.value.getLevel(); // 현재 줌 레벨 업데이트
    console.log('Zoom level changed:', level.value);

    if (!detailMode.value && level.value <= 10) {
      detailMode.value = true; // 상세 모드 활성화
      removePolygon(); // 기존 폴리곤 제거
      await init('/sig.json'); // 상세 데이터를 로드
    } else if (detailMode.value && level.value > 10) {
      detailMode.value = false; // 광역 모드 활성화
      removePolygon(); // 기존 폴리곤 제거
      await init('/sido.json'); // 광역 데이터를 로드
    }
  });
};

// JSON 데이터로 폴리곤 초기화
const init = async (path) => {
  try {
    console.log('Fetching JSON from:', path);
    const response = await axios.get(path);
    const geojson = response.data;

    console.log('Loaded JSON:', geojson);

    // JSON 데이터를 기반으로 폴리곤 생성
    const areas = geojson.features.map((unit) => {
      const coordinates = unit.geometry.coordinates[0];
      const name = unit.properties.SIG_KOR_NM;
      const cd_location = unit.properties.SIG_CD;

      const path = coordinates.map((coord) => new kakao.maps.LatLng(coord[1], coord[0]));
      return { name, path, location: cd_location };
    });

    console.log('Parsed Areas:', areas);

    areas.forEach(displayArea);
  } catch (error) {
    console.error(`Error loading JSON from ${path}:`, error);
  }
};

// 폴리곤 제거
const removePolygon = () => {
  polygons.value.forEach((polygon) => polygon.setMap(null));
  polygons.value = [];
};

// 폴리곤 생성 및 지도에 표시
const displayArea = (area) => {
  const polygon = new kakao.maps.Polygon({
    path: area.path,
    strokeWeight: 2,
    strokeColor: '#5995ed',
    strokeOpacity: 0.8,
    fillColor: '#fff',
    fillOpacity: 0.5,
  });

  polygon.setMap(map.value);
  polygons.value.push(polygon);

  console.log(`Polygon created for area: ${area.name}`);

  // 이벤트 설정
  kakao.maps.event.addListener(polygon, 'mouseover', () => {
    polygon.setOptions({ fillColor: '#5995ed' });
  });

  kakao.maps.event.addListener(polygon, 'mouseout', () => {
    polygon.setOptions({ fillColor: '#fff' });
  });

  kakao.maps.event.addListener(polygon, 'click', () => {
    alert(`${area.name}을 클릭했습니다.`);
  });
};

// 필터 버튼
const filters = ['가격', '면적', '사용승인일', '층수'];

// Pinia store 사용
const houseInfoStore = useHouseInfoStore();

// 데이터를 가져오는 함수
const fetchData = async (type) => {
  await houseInfoStore.fetchHouseInfo(type); // API 호출하여 데이터 가져오기
  // console.log(houseInfoStore.houseInfos.data); // store의 houseInfos 상태 출력
};

onMounted(async () => {
  await fetchData('아파트'); // 데이터가 로딩된 후 실행
});

// store에서 houseInfos 가져오기
const houseInfos = houseInfoStore.houseInfos;
</script>




=======
>>>>>>> 6c2071d4ff1e5b7aacee95ac27651e9273893abb
<template>
  <div class="flex flex-row items-center w-full h-[100vh] pt-20">
    <!-- 버튼 영역 -->
    <div class="bg-white w-20 h-full font-PretendardRegular text-xs border-r border-gray-200">
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
      <!-- 필터 버튼 -->
      <div class="flex flex-row items-center m-0 bg-white h-14 border-b border-gray-200">
        <div v-for="(filter, index) in filters" :key="index" class="relative inline-block text-left ml-2">
          <button type="button" class="inline-flex justify-between w-full h-8 border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500">
            {{ filter }}
            <svg class="-mr-1 ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <!-- 리셋 버튼 -->
        <button type="button" class="relative inline-block text-left ml-2 h-8 px-2 py-2 bg-white border border-gray-300 shadow-sm focus:ring-indigo-500">
          <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
          </svg>
        </button>
      </div>
      <!-- 리스트와 지도 영역 -->
      <div class="flex flex-row h-full font-PretendardRegular text-gray-800">
        <div class="flex flex-col h-full rounded-lg">
          <div class="flex flex-row p-2 text-xs border-b-2">
            <p class="mr-1 ml-2 cursor-pointer font-bold">인기순</p>
            <p class="mr-1 cursor-pointer font-bold">가격순</p>
            <p class="mr-1 cursor-pointer font-bold">면적순</p>
            <FilterButton></FilterButton>
          </div>
          <!-- 목록 영역 추가할 수 있습니다 -->
<<<<<<< HEAD
          <div class="p-2">

            <div v-if="houseInfosLoaded">
              <div v-for="(house, index) in houseInfos.data" :key="index">
                <p>{{ house.name }}</p>
                <p>{{ house.price }}</p>
              </div>
            </div>

            <!-- 데이터가 로딩 중일 때 표시할 로딩 화면 -->
            <div v-else>
              <p>로딩 중...</p>
            </div>
=======
          <div class="p-2 overflow-y-auto">

            <!--<div v-if="houseInfosLoaded">-->
              <div v-for="(house, index) in houseInfos.data" :key="index">

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
            <!--</div>-->

            <!-- 데이터가 로딩 중일 때 표시할 로딩 화면 -->
        
>>>>>>> 6c2071d4ff1e5b7aacee95ac27651e9273893abb

          </div>
        </div>

        <!-- 지도 표시 영역 -->
        <div class="relative w-full bg-purple-100">
<<<<<<< HEAD
          <KakaoMap
    :lat="36.866826"
    :lng="127.7786567"
    :level="12"
    @onLoadKakaoMap="onLoadKakaoMap"
    style="width: 100%; height: 100vh;"
  />
=======
          <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" width="100%" height="100%"/>
>>>>>>> 6c2071d4ff1e5b7aacee95ac27651e9273893abb
        </div>
      </div>

    </div>
  </div>
</template>
<<<<<<< HEAD
=======

<script setup>
import { KakaoMap } from 'vue3-kakao-maps';
import { ref, onMounted } from 'vue';
import { useHouseInfoStore } from '@/stores/mapCard'; // Pinia store 가져오기
import CardView from './CardView.vue';

const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
};

// 필터 버튼 목록
const filters = ['가격', '면적', '사용승인일', '층수'];

// Pinia store 사용
const houseInfoStore = useHouseInfoStore();

// 데이터를 가져오는 함수
const fetchData = async (type) => {
  await houseInfoStore.fetchHouseInfo(type); // API 호출하여 데이터 가져오기
  //console.log(houseInfoStore.houseInfos.data); // store의 houseInfos 상태 출력
};

onMounted(async () => {
  await fetchData('아파트'); // 데이터가 로딩된 후 실행
});



// store에서 houseInfos 가져오기
const houseInfos = houseInfoStore.houseInfos;

</script>
>>>>>>> 6c2071d4ff1e5b7aacee95ac27651e9273893abb
