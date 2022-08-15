<template>
  <div class="container">
    <div class="text">
      <slot>{{ text }}</slot>
    </div>
    <div class="icon">
      <el-icon
        :style="{ color: !reverse ? downColor : 'red' }"
        :size="20"
        v-if="type !== 'up'"
        ><ArrowDown
      /></el-icon>
      <el-icon
        :style="{ color: !reverse ? upColor : 'blue' }"
        :size="20"
        v-else
        ><ArrowUp
      /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'up',
  },
  text: {
    type: String,
    default: '',
  },
  reverse: {
    type: Boolean,
    defalut: false,
  },
  upColor: {
    type: String,
    default: 'red',
  },
  downColor: {
    type: String,
    default: 'blue',
  },
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
}

.icon {
  display: flex;
  align-items: center;
  margin-left: 6px;
}
</style>
