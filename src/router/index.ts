import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { 
    name: 'home',
    path: '/',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页'
      // keepAlive: true
    }
  },
  {
    name: 'goods',
    path: '/goods',
    component: () => import('@/views/goods/index.vue'),
    meta: {
      title: '商城'
    }
  },
  { 
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/notFound.vue'),
    meta: {
      title: '404页面不存在'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, _from) => {
  document.title = to.meta.title as string || ''
  return true
})

export default router
