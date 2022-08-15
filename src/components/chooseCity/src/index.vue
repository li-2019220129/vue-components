<template>
  <el-popover
    placement="bottom-start"
    :width="400"
    trigger="click"
    v-model:visible="visible"
  >
    <template #reference>
      <div class="container" @click="rotateClick">
        <div>{{ resout }}</div>
        <div
          :class="{
            icon: true,
            rotate: visible,
            routateEnd: !visible && reverse,
          }"
        >
          <el-icon><ArrowDown /></el-icon>
        </div>
      </div>
    </template>
    <div class="main">
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="radio" size="small">
            <el-radio-button label="按城市" />
            <el-radio-button label="按省份" />
          </el-radio-group>
        </el-col>
        <el-col :span="16">
          <el-select
            size="small"
            v-model="cityValue"
            filterable
            @change="changeSelect"
            :filter-method="filterMethod"
            placeholder="请搜索城市"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <div class="city-select" v-if="radio === '按城市'">
        <div class="city">
          <div
            class="city-item"
            @click="clickChat(key)"
            v-for="(val, key, index) in cities"
            :key="index"
          >
            {{ key }}
          </div>
        </div>
        <div class="scrollbar">
          <el-scrollbar max-height="300px">
            <div v-for="(val, key, index) in cities" :key="index">
              <el-row style="margin-bottom: 10px" :id="key">
                <el-col :span="2">
                  {{ `${key}:` }}
                </el-col>
                <el-col :span="22">
                  <div
                    @click="clickItem(item)"
                    class="city-name"
                    v-for="(item, i) in val"
                    :key="i"
                  >
                    {{ item.name }}
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <div v-else>
        <div class="province">
          <div
            class="province-item"
            @click="clickChat(key)"
            v-for="(val, key, index) in provinces"
            :key="index"
          >
            {{ key }}
          </div>
        </div>
        <div class="scrollbar">
          <el-scrollbar max-height="300px">
            <div v-for="(item, index) in Object.values(provinces)" :key="index">
              <template v-for="(item1, index1) in item" :key="index1">
                <el-row style="margin-bottom: 10px" :id="item1.id">
                  <el-col :span="3">
                    {{ `${item1.name}:` }}
                  </el-col>
                  <el-col :span="21">
                    <div
                      @click="clickProvice(item2)"
                      class="province-name"
                      v-for="(item2, i) in item1.data"
                      :key="i"
                    >
                      {{ item2 }}
                    </div>
                  </el-col>
                </el-row>
              </template>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { emit } from 'process'
import { onMounted, ref } from 'vue'
import city from '../lib/city'
import province from '../lib/province.json'
import { City, Province } from './types'
const resout = ref('请选择')
const reverse = ref(false)
const visible = ref(false)
const radio = ref('按省份')
const cityValue = ref('')
const cities = ref(city.cities)
const provinces = ref(province)
const scrollTop = ref([])
let allCity = ref<City[]>([])
const emits = defineEmits(['choose'])
const options = ref<City[]>([])
const rotateClick = () => {
  reverse.value = true
  visible.value = !visible.value
}
const clickItem = (item: City) => {
  content(item.name)
  emits('choose', item)
}
const clickChat = (item: string) => {
  const el = document.getElementById(item)
  el && el.scrollIntoView()
}
const clickProvice = (item: string) => {
  content(item)
  emits('choose', item)
}
const content = (name: string) => {
  resout.value = name
}
// 自定义搜索过滤
let filterMethod = (val: string) => {
  let values = Object.values(cities.value).flat(2)
  if (val === '') {
    options.value = values
  } else {
    if (radio.value === '按城市') {
      // 中文和拼音一起过滤
      options.value = values.filter((item) => {
        return item.name.includes(val) || item.spell.includes(val)
      })
    } else {
      // 中文过滤
      options.value = values.filter((item) => {
        return item.name.includes(val)
      })
    }
  }
}
const changeSelect = (val: number) => {
  let city =  allCity.value.find((item) => item.id === val)!
  resout.value = city.name!
  emits('choose', city)
}
onMounted(() => {
  let values = Object.values(cities.value).flat(2)
  options.value = values
  allCity.value = values
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  cursor: pointer;
  .icon {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  .rotate {
    animation: rotation 0.2s linear forwards;
  }
  .routateEnd {
    animation: routateEnd 0.2s linear forwards;
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
  @keyframes routateEnd {
    0% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.main {
  padding: 3px;
  .city,
  .province {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    align-items: center;
    .city-item,
    .province-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3px 6px;
      margin-right: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      border: 1px solid #eee;
    }
  }
  ::v-deep(.el-row .el-col) {
    display: flex;
  }
  .scrollbar {
    margin-top: 6px;
    .city-name,
    .province-name {
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 5px;
    }
    ::v-deep(.el-row .el-col) {
      display: flex;
      flex-wrap: wrap;
    }
    // ::v-deep(.el-row .el-col-2) {
    //   display: flex;
    //   align-items: flex-start;
    // }
    //  ::v-deep(.el-row .el-col-3) {
    //   display: flex;
    //   align-items: flex-start;
    // }
  }
}
</style>
