<template>
  <div class="main">
    <el-container>
      <el-aside width="auto">
       <Menu :collapse="isCollapse"></Menu>
      </el-aside>
      <el-container>
        <el-header
          >
          <Nav v-model="isCollapse"></Nav>
          </el-header>
        <el-main> <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Menu from '../../../cpn/menu.vue'
import Nav from '../../../cpn/nav.vue' 
const isCollapse = ref(false)
// function handleClick() {
//   isCollapse.value = !isCollapse.value
// }
</script>

<style lang="less" scoped>
.el-container,
.el-menu {
  height: 100%;
}

.el-header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
.main{
  width:100%;
  height: 100%;
}
</style>
