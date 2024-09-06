import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/patients',
      name: 'patients',
      component: () => import('../views/DashboardView.vue')
    },
  ]
})

export default router
