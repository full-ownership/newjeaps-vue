<script setup>
import { KakaoMap } from 'vue3-kakao-maps';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useHouseInfoStore } from '@/stores/mapCard';
import CardView from './CardView.vue';

const map = ref(null); // Kakao Map 객체
const polygons = ref([]); // 생성된 폴리곤 객체 배열
const detailMode = ref(false); // 상세 모드 여부
const level = ref(12); // 현재 줌 레벨

const onLoadKakaoMap = async (mapRef) => {
  map.value = mapRef;

  console.log('Kakao Map Loaded:', map.value);

  await init('/sido.json');

  kakao.maps.event.addListener(map.value, 'zoom_changed', async () => {
    level.value = map.value.getLevel();
    console.log('Zoom level changed:', level.value);

    if (!detailMode.value && level.value <= 10) {
      detailMode.value = true;
      removePolygon();
      await init('/sig.json');
    } else if (detailMode.value && level.value > 10) {
      detailMode.value = false;
      removePolygon();
      await init('/sido.json');
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