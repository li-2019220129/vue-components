<template>
  <!-- <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="collapse"
  >
    <el-menu-item index="1">
      <el-icon
        ><el-icon><HomeFilled /></el-icon
      ></el-icon>
      <template #title> 首页 </template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><Check /></el-icon>
      <template #title>图标选择器</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><Location /></el-icon>
      <template #title>省市区选择</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu> -->
  <m-menu :collapse="collapse" :data="data" router :default-active="$route.path"> </m-menu>
</template>

<script setup lang="ts">
import { MenuItem } from '../components/menu/src/types'
defineProps<{
  collapse: Boolean
}>()
let data: MenuItem[] = [
  {
    icon: 'HomeFilled',
    index: '/',
    name: '首页',
  },
  {
    icon: 'Check',
    index: '/chooseIcon',
    name: '图标选择器',
  },
  {
    icon: 'Location',
    index: '/chooseArea',
    name: '省市区选择',
  },
  {
    icon: 'Sort',
    index: '/trend',
    name: '趋势标记',
  },
  {
    icon: 'Timer',
    index: '/chooseTime',
    name: '时间选择',
  },
  {
    icon: 'Bell',
    index: '/notification',
    name: '通知菜单',
  },
  {
    icon: 'Menu',
    index: '/menu',
    name: '导航菜单',
  },
  {
    icon: 'TurnOff',
    index: '/chooseCity',
    name: '城市选择',
  },
  {
    icon: 'Right',
    index: '/progress',
    name: '进度条',
  },
  {
    icon: 'Sunrise',
    index: '/calendar',
    name: '日历',
  },
  {
    icon: 'Setting',
    index: '/form',
    name: '表单',
  },
  {
    icon: 'Setting',
    index: '/modalForm',
    name: '弹出框表单',
  },
  {
    icon: 'Tickets',
    index: '/tabel',
    name: '表格',
  },
]
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
