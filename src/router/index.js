import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import GrowthPlatform from '../views/GrowthPlatform.vue'
import GrowthTrack from '../views/GrowthTrack.vue'
import MemberBenefits from '../views/MemberBenefits.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  {
    path: '/growth-platform',
    name: 'GrowthPlatform',
    component: GrowthPlatform,
    meta: {
      title: '成长平台',
      keepAlive: true
    }
  },
  {
    path: '/growth-track',
    name: 'GrowthTrack',
    component: GrowthTrack,
    meta: {
      title: '成长轨迹',
      keepAlive: true
    }
  },
  {
    path: '/member-benefits',
    name: 'MemberBenefits',
    component: MemberBenefits,
    meta: {
      title: '会员权益',
      keepAlive: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 页面切换时滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    // 首页只显示"卡内基训练"，其他页面显示"页面名 - 卡内基训练"
    if (to.name === 'Home') {
      document.title = '卡内基训练'
    } else {
      document.title = `${to.meta.title} - 卡内基训练`
    }
  }
  next()
})

export default router