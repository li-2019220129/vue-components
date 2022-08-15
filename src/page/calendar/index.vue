<template>
  <div class="container">
    <my-calendar displayEventEnd :eventContent="eventContent" :events="events" @date-click="dateClick"></my-calendar>
  </div>
</template>

<script setup lang="ts">
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { ref } from 'vue'
import { EventContentArg } from '@fullcalendar/core';
import {EventItem} from '../../components/calendar/src/types'
const events = ref<EventItem[]>([
  {
    title: '购物',
    start: '2022-08-14 10:00:00',
    end: '2022-08-14 12:00:00',
    editable: true
  },
  {
    title: '学习',
    start: '2022-08-15 08:00:00',
    end: '2022-08-15 16:00:00'
  }
])
let dateClick = (info: DateClickArg) => {
  let event = {
    start: `${info.dateStr} 12:00:00`,
    end: `${info.dateStr} 13:00:00`,
    title: '吃饭'
  }
  events.value.push(event)
  console.log(info)
}
let eventContent = (arg: EventContentArg) => {
  let el = document.createElement('div')
  let timeTextArr = arg.timeText.split(' - ')
  let start = timeTextArr[0].replace('上午', '').replace('下午', '').replace('时', '')
  let end = timeTextArr[1].replace('上午', '').replace('下午', '').replace('时', '')
  el.innerHTML = `
         <div>开始时间: ${start}</div>
         <div>结束时间: ${end}</div>
         <div>标题: ${arg.event._def.title}</div>
        `
  return {
    domNodes: [el]
  }
}
</script>

<style lang="less" scoped></style>
