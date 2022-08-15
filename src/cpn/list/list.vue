<template>
  <div class="container">
    <el-tabs stretch>
      <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :label="item.title"
      >
        <el-scrollbar max-height="300px">
          <div
            class="list-item"
            v-for="(item1, index1) in item.content"
            :key="index1"
            @click="clickItem(item1, index1)"
          >
            <message-item :item="item1"></message-item>
          </div>
        </el-scrollbar>
        <div class="actions">
          <div
            class="a-item"
            :class="{ border: i !== actions.length - 1 }"
            v-for="(action, i) in actions"
            :key="i"
            @click="clickAction(action, i)"
          >
            <div class="a-icon" v-if="action.icon">
              <el-icon>
                <component :is="action.icon"></component>
              </el-icon>
            </div>
            <div class="a-text">{{ action.text }}</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { ListOptions, ListFace, ListItem } from './type'
import messageItem from './cpn/message-item.vue'
const props = defineProps({
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true,
  },
  actions: {
    type: Array as PropType<ListFace[]>,
    default() {
      return []
    },
  },
})
const emit = defineEmits(['clickItem', 'clickAction'])
const clickItem = (item: ListItem, index: number) => {
  emit('clickItem', {
    item,
    index,
  })
}
const clickAction = (item: ListFace, index: number) => {
  emit('clickAction',{
    item,
    index,
  })
}
console.log(props)
</script>

<style lang="less" scoped>
.list-item {
  padding: 12px 20px;
  cursor: pointer;
  &:hover {
    background-color: #e6f6ff;
  }
  .avatar {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .content {
    flex: 3;
    .title {
      display: flex;
      justify-content: space-between;
      align-content: center;
    }
    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
.actions {
  padding: 10px 0 0 0;
  border-top: 1px solid #cccccc;
  display: flex;
  align-items: center;
  .a-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    cursor: pointer;
  }
  .a-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  .border {
    border-right: 1px solid #cccccc;
  }
}
</style>
