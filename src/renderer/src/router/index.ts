import * as VueRouter from 'vue-router'

import Layout from '@renderer/layout/index.vue'
import Recommend from '@renderer/views/recommend/index.vue'
import Iptv from '@renderer/views/iptv/index.vue'
import About from '@renderer/views/about/index.vue'
import Collect from '@renderer/views/collect/index.vue'
import History from '@renderer/views/history/index.vue'
import Setting from '@renderer/views/setting/index.vue'

const routes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/recommend',
    children: [
      { path: 'recommend', component: Recommend },
      { path: 'iptv', component: Iptv },
      { path: 'about', component: About },
      { path: 'collect', component: Collect },
      { path: 'history', component: History },
      { path: 'setting', component: Setting }
    ]
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes
})

export default router
