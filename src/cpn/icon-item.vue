<template>
  <div class="icon">
    <div
      class="icon-item"
      v-for="(val, key, index) in ElementPlusIconsVue"
      :key="index"
      @click="iconItemClick(key)"
    >
      <div>
        <component :is="`${key}`" style="width: 2em; height: 2em"></component>
      </div>
      <div class="text">{{ key }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useCopy } from '../hooks/index'
const emit = defineEmits(['editShowClose'])
const iconItemClick = (key: string) => {
  let text = `<el-icon><${key}/></el-icon>`
  useCopy(text)
  emit('editShowClose')
}
</script>

<style lang="less" scoped>
.icon {
  display: flex;
  flex-wrap: wrap;
}
.icon-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  // ::v-deep(.el-icon){
  //   width:2em;
  //   height: 2em;
  // }
  // ::v-deep(.el-icon svg){
  //   width:2em;
  //   height: 2em;
  // }
}
.text {
  font-size: 13px;
}
</style>
