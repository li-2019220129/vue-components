<template>
  <div class="container">
   <choose-time :startOptions="startOptions" @dataTime="dataTime"></choose-time>
   <br>
   <choose-date :startOptions="startOptionsTimes" @endValueSelect="endValueSelect"></choose-date>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core'
import { dataTimeType,endDateSelect } from './type'
const dataTime = (data:dataTimeType)=>{
  console.log(data)
} 
const endValueSelect = (val:endDateSelect)=>{
  console.log(val) 
}
let startOptions = {
  clearable:false
}
let startOptionsTimes = {
 clearable:false
}
</script>

<style lang="less" scoped></style>
