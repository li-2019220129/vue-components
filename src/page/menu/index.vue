<template>
  <div class="container">
    <!-- <m-menu style="width: 200px" :data="data"></m-menu> -->
    <m-infinite-menu style="width: 400px" :data="data1"></m-infinite-menu>
  </div>
</template>

<script setup lang="ts">
const data = [
  {
    name: '导航一',
    index: '1',
    icon: 'Document',
  },
  {
    name: '导航二',
    index: '2',
    icon: 'Document',
  },
  {
    name: '导航三',
    index: '3',
    icon: 'Document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'Document',
      },
    ],
  },
]
const data1 = [
  {
    name: '导航一',
    index: '1',
    icon: 'Document',
  },
  {
    name: '导航二',
    index: '2',
    icon: 'Document',
  },
  {
    name: '导航三',
    index: '3',
    icon: 'Document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'Document',
        children: [
          {
            name: '导航3-1-1',
            index: '3-1-1',
            icon: 'Document',
            children: [
              {
                name: '导航3-1-1-1',
                index: '3-1-1-1',
                icon: 'Document',
                children: [
                  {
                    name: '导航3-1-1-1-1',
                    index: '3-1-1-1-1',
                    icon: 'Document',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
</script>

<style lang="less" scoped></style>
