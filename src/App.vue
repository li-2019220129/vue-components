<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.container {
  height: 100vh;
  width: 100vw;
}
#app{
  text-align: none;
}
</style>
