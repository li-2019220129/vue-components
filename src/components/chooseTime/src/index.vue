<template>
  <div class="container">
    <el-time-select
      v-model="startTime"
      :max-time="endTime"
      class="mr-4"
      :placeholder="startPlaceholder"
      :start="startTimeStart"
      :step="setpTime"
      :end="endTimeStart"
      v-bind="$attrs.startOptions"
    />
    <el-time-select
      v-model="endTime"
      :min-time="startTime"
      :placeholder="endPlaceholder"
      :start="startTimeStart"
      :step="setpTime"
      :end="endTimeStart"
      :disabled="disabled"
      v-bind="$attrs.endOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({
  startPlaceholder: {
    type: String,
    default:'请选择开始时间'
  },
  endPlaceholder: {
    type: String,
     default:'请选择结束时间'
  },
  startTimeStart: {
    type: String,
    default: '8:30',
  },
  endTimeStart: {
    type: String,
    default: '18:30',
  },
  setpTime:{
    type: String,
    default: '00:30',
  }
})
const emit = defineEmits(['dataTime'])
const startTime = ref('')
const endTime = ref('')
const disabled = ref(true)
watch(startTime,(val)=>{
  if(!val){
    endTime.value = ''
    disabled.value = true
  }
  else{
    disabled.value = false
  }
})
watch(endTime,(val)=>{
 if(val!==''){
  emit('dataTime',{
    startTime:startTime.value,
    endTime:val
  })
 }
})
</script>
<style lang="less" scoped>
.container {
  display: flex;
  .mr-4 {
    margin-right: 10px;
  }
}
</style>
