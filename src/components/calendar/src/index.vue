<template>
  <div id="calendar"></div>
</template>

<script setup lang="ts">
import '@fullcalendar/core/vdom'
import { EventItem } from './types'
import { Calendar, EventClickArg, EventContentArg } from '@fullcalendar/core'
import daygridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { onMounted, PropType, ref, watch } from 'vue'
const calendar = ref<Calendar>()
let emits = defineEmits(['date-click', 'event-click'])
const props = defineProps({
  //语言
  local: {
    type: String,
    default: 'zh-cn',
  },
  //视图模式
  initialView: {
    type: String,
    default: 'dayGridMonth',
  },
  buttonText: {
    type: Object,
    default: () => {
      return {
        today: '今天',
        month: '月',
        week: '周',
        day: '日',
        prevYear: '上一年',
        nextYear: '下一年',
        prev: '上一月',
        next: '下一月',
      }
    },
  },
  //头部工具栏
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: 'title',
        center: '',
        end: 'prev today next',
      }
    },
  },
  footerToolbar: {
    type: Object,
    default: () => {
      return {}
    },
  },
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => {
      return []
    },
  },
  displayEventEnd: {
    type: Boolean,
    default: false,
  },
  // 自定义渲染内容方法
  eventContent: {
    type: Function,
  },
})
const renderCalendar = () => {
  const el = document.getElementById('calendar')
  if (el) {
    calendar.value = new Calendar(el, {
      plugins: [daygridPlugin, interactionPlugin],
      initialView: props.initialView,
      buttonText: props.buttonText,
      locale: props.local,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      eventSources: [
        {
          events(e, callback) {
            console.log(props.events.length, '999')
            if (props.events.length) {
              console.log(props.events)
              callback(props.events)
            } else callback([])
          },
        },
      ],
      // 点击日历的某一天
      dateClick(info: DateClickArg) {
        console.log(info)
        emits('date-click', info)
      },
      // 点击日历上的时间
      eventClick(info: EventClickArg) {
        // console.log('eventClick', info)
        emits('event-click', info)
      },
      displayEventEnd: props.displayEventEnd,
      eventContent: props.eventContent,
    })
    calendar.value.render()
  }
}
// 监听事件源的变化
watch(
  () => props.events,
  () => {
    renderCalendar()
  },
  { deep: true }
)
onMounted(() => {
  renderCalendar()
})
</script>

<style lang="less" scoped></style>
