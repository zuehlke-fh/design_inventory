import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProjectDetailView from '../views/ProjectDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/project/:id',
      name: 'project-detail',
      component: ProjectDetailView,
      props: true
    }
  ]
});

export default router;