import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AuthPage from '@/views/AuthPage.vue'
import HelpPage from '@/views/HelpPage.vue'
import MessagePage from '@/views/MessagePage.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomePage,
          meta: {
            layout: 'main',
            auth: true
          }
        },
        {
          path: '/help',
          name: 'help',
          component: HelpPage,
          meta: {
            layout: 'main',
            auth: true
          }
        },
        {
          path: '/message',
          name: 'message',
          component: MessagePage,
          meta: {
            layout: 'main',
            auth: true
          }
        }
      ]
    },
    {
      path: '/auth',
      name: 'AuthLayout',
      component: AuthLayout,
      children: [
        {
          path: '/auth',
          name: 'auth',
          component: AuthPage,
          meta: {
            layout: 'auth',
            auth: false
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const isAuth = store.getters['auth/isAuthenticated']

  if (requireAuth && !isAuth) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
