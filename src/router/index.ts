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
      props: route => ({
        id: parseInt(route.params.id as string),
        page: route.query.page || 'overview'
      })
    },
    // Handle double base URL
    {
      path: '/design_inventory/project/:id',
      redirect: to => ({
        path: `/project/${to.params.id}`,
        query: to.query
      })
    },
    {
      // Catch-all route for GitHub Pages 404 handling
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

export default router;