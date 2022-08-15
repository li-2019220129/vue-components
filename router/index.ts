import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import container from '../src/components/container/src/index.vue'
import Home from '../src/page/Home.vue'
import chooseSelcon from '../src/page/chooseIcon/index.vue'
import chooseArea from '../src/page/chooseArea/index.vue'
import trend from '../src/page/trend/index.vue'
import notification from '../src/page/notification/index.vue'
import menu from '../src/page/menu/index.vue'
import progress from '../src/page/progress/index.vue'
import chooseTime from '../src/page/chooseTime/index.vue'
import chooseCity from '../src/page/chooseCity/index.vue'
import form from '../src/page/form/index.vue'
import modalForm from '../src/page/modalForm/index.vue'
import tabel from '../src/page/tabel/index.vue'
import calendar from '../src/page/calendar/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: container,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: '/chooseIcon',
        component: chooseSelcon,
      },
      {
        path: '/chooseArea',
        component: chooseArea,
      },
      {
        path: '/trend',
        component: trend,
      },
      {
        path: '/notification',
        component: notification,
      },
      {
        path: '/menu',
        component: menu,
      },
      {
        path: '/progress',
        component: progress,
      },
      {
        path: '/chooseTime',
        component: chooseTime,
      },
      {
        path: '/chooseCity',
        component: chooseCity,
      },
      {
        path: '/form',
        component: form,
      },
      {
        path: '/modalForm',
        component: modalForm,
      },
      {
        path: '/tabel',
        component: tabel,
      },
      {
        path: 'calendar',
        component: calendar,
      },
    ],
  },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
export default router
