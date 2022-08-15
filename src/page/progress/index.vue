<template>
  <div class="container">
    <m-progress isAnimation :percentage="30"></m-progress>
    <br />
    <m-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="30"
      isAnimation
    ></m-progress>
    <br />
    <m-progress isAnimation type="circle" :percentage="100" status="success">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </m-progress>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>
