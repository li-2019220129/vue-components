<template>
  <div class="container">
    <el-select
      v-model="province"
      class="select"
      placeholder="请选择省份"
      size="large"
      clearable
    >
      <el-option
        v-for="(item, index) in areas"
        :key="index"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      v-model="city"
      class="select"
      placeholder="请选择城市"
      size="large"
      :disabled="!province"
      clearable
    >
      <el-option
        v-for="(item, index) in selectCity"
        :key="index"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      v-model="area"
      class="select"
      placeholder="请选择区域"
      size="large"
      :disabled="!city"
      clearable
    >
      <el-option
        v-for="(item, index) in selectArea"
        :key="index"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import allAreas from '../lib/pca-code.json'
import { computed, ref, watch } from 'vue'
export interface Date {
  name: string
  code: string
}
const province = ref('')
const city = ref('')
const area = ref('')
const areas = ref(allAreas)
const emit = defineEmits(['change'])
const selectCity = computed(() => {
  city.value = ''
  area.value = ''
  if (!province.value) return []
  else {
    return areas.value.find((item) => item.code === province.value)?.children
  }
})
const selectArea = computed(() => {
  area.value = ''
  if (!city.value) return []
  else {
    return selectCity.value?.find((item) => item.code === city.value)?.children
  }
})
watch(area, (val) => {
  if(!val) return 
  let provinceDate: Date = {
    name:areas.value.find((item) => item.code === province.value)?.name!,
    code:province.value
  }
  let cityDate: Date = {
    name:selectCity.value?.find((item) => item.code === city.value)?.name!,
    code:city.value
  }
  let areaDate: Date = {
    name:selectArea.value?.find((item)=>item.code === val)?.name!,
    code:val
  }
  emit('change',{
    province:provinceDate,
    city:cityDate,
    area:areaDate
  })
})
</script>

<style lang="less" scoped>
.select {
  margin-right: 15px;
}
</style>
