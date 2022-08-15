<template>
  <el-icon @click="handleClick" :size="size"
    ><Expand v-if="!modelValue" /> <Fold v-else />
  </el-icon>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const size = ref(24)
const props = defineProps<{
  modelValue: Boolean
}>()
const emit = defineEmits(['update:modelValue'])
function handleClick() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style lang="less" scoped></style>
