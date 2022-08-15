<template>
  <div class="container">
      <div v-if="item.avatar" class="avatar">
        <el-avatar :size="30" :src="item.avatar" />
      </div>
      <div class="content">
        <div v-if="item.title" class="title">
          <div>
            {{ item.title }}
          </div>
          <el-tag size="small" v-if="item.tag" :type="item.tagType">{{
            item.tag
          }}</el-tag>
        </div>
        <div v-if="item.desc" class="time">{{ item.desc }}</div>
        <div v-if="item.time" class="time">{{ item.time }}</div>
      </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
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
</style>
