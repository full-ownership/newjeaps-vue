import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MapView from '../component/MapView.vue'
import NoticeView from '../views/NoticeView.vue'

const routes = [
  {
    path: '/', 
    component: MainView, 
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView, 
      },
      {
        path: 'login',
        name: 'login', 
        component: LoginView, 
      },
      {
        path: 'map',
        name: 'map',
        component: MapView,
      },
      {
        path: 'notice',
        name: 'notice',
        component: NoticeView,
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;