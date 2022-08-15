<template>
  <div class="container">
    <el-progress v-bind="$attrs" :percentage="p">
      <slot :percentage="p"></slot>
    </el-progress>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from '@vue/runtime-core'
let p = ref(0)
let props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
  isAnimation: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Number,
    default: 3000,
  },
})
onMounted(() => {
  if (props.isAnimation) {
    let t = Math.ceil(props.time / props.percentage)
    let time = setInterval(() => {
      p.value += 1
      if (p.value >= props.percentage) {
        p.value = props.percentage
        clearInterval(time)
      }
    }, t)
  } else {
    p.value = props.percentage
  }
})
</script>

<style lang="less" scoped></style>
