<template>
  <div class="container" style="display: flex">
    <div style="margin-right: 10px">
      <el-date-picker
        v-model="startValue"
        type="date"
        :placeholder="startPlaceholder"
        format="YYYY/MM/DD"
        :disabled-date="startDisableDate"
        v-bind="$attrs.startOptions"
      />
    </div>
    <el-date-picker
      v-model="endValue"
      type="date"
      :placeholder="endPlaceholder"
      format="YYYY/MM/DD"
      :disabled="endDisabled"
      :disabled-date="endDisableDate"
       v-bind="$attrs.endOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
const props = defineProps({
  startPlaceholder: {
    type: String,
    default: '请选择开始日期',
  },
  endPlaceholder: {
    type: String,
    default: '请选择结束日期',
  },
  disableToday: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['endValueSelect'])
const startValue = ref<Date | null>(null)
const endValue = ref<Date | null>(null)
const endDisabled = ref(true)
const startDisableDate = (time: Date) => {
  if (props.disableToday) {
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
  }
}
const endDisableDate = (time: Date) => {
  if (startValue.value) {
    return time.getTime() < startValue.value.getTime() + 1000 * 60 * 60 * 24
  }
}
watch(startValue, (val) => {
  if (!val) {
    endDisabled.value = true
    endValue.value = null
  } else {
    endDisabled.value = false
  }
})
watch(endValue, (val) => {
  if (val) {
    emit('endValueSelect', {
      startValue:startValue.value,
      endValue:val
    })
  }
})
</script>

<style lang="less" scoped></style>
