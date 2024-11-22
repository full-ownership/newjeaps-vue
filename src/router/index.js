import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MapView from '../views/MapView.vue'
import NoticeView from '../views/NoticeView.vue'
import IntroductionView from '@/views/IntroductionView.vue'
import NoticeDetailView from '@/views/notice/NoticeDetailView.vue'
import FaqDetailView from '@/views/notice/FaqDetailView.vue'
import SignupView from '@/views/Signup/SignupView.vue'

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
      },
      {
        path: 'notice/noticeDetail/:id',
        name: 'noticeDetail',
        component: NoticeDetailView,
      },

      {
        path: 'notice/faqDetail/:id',
        name: 'faqDetail',
        component: FaqDetailView,
      },
      {
        path: 'signup',
        name: 'signup',
        component: SignupView,
      },


      {
        path: 'introduction',
        name: 'introduction',
        component: IntroductionView,
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
