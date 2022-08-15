<template>
  <div class="container">
    <el-popover  placement="bottom" :width="300" trigger="click">
      <template #reference>
        <el-badge
          style="cursor: pointer"
          :value="value"
          :isDot="isDot"
          :max="max"
          class="item"
        >
          <el-icon :size="20">
            <component :is="icon"></component>
          </el-icon>
        </el-badge>
      </template>
      <template #default>
        <slot></slot>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    default: 'Bell',
  },
  value: {
    type: [String, Number],
    default: 0,
  },
  max: {
    type: Number,
  },
  isDot: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less" scoped>

</style>
