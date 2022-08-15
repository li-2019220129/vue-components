<template>
  <div class="container">
    <el-menu :default-active="defaultActive" :router="router" v-bind="$attrs" class="el-menu-vertical-demo">
      <template v-for="(item, index) in data" :key="index">
        <el-sub-menu
          v-if="item.children"
          :index="item.index"
        >
          <template #title>
            <el-icon
              ><component v-if="item.icon" :is="item.icon"></component
            ></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item1, index1) in item.children"
            :index="item1.index"
            :key="index1"
          >
            <el-icon
              ><component v-if="item1.icon" :is="item1.icon"></component
            ></el-icon>
            <span>{{ item1.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.index">
          <el-icon
            ><component v-if="item.icon" :is="item.icon"></component
          ></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { MenuItem } from './types'
const props = defineProps({
  data: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  defaultActive: {
    type: String,
    default:''
  },
  router:{
    type:Boolean,
    default:false
  }
})
</script>

<style lang="less" scoped></style>
