<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Message, Menu as IconMenu, Setting } from '@element-plus/icons-vue';

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
};
const tableData = ref(Array(20).fill(item));
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
}
.layout-container-demo {
  .el-header {
    position: relative;
    background-color: #fff;
    color: var(--el-text-color-primary);
    border-bottom: 0;
    box-shadow: 0 0 2rem 0 #e6eaf0;
  }
  .el-aside {
    // width: 240px;
    color: rgba(233, 236, 239, 0.5);
    // background: #222e3c !important;
    border-right: solid 1px #e6e6e6;
    box-sizing: border-box;
  }
  .el-menu {
    border-right: none;
    // background: #222e3c;
    // color: rgba(233, 236, 239, 0.5);
  }
  .el-main {
    padding: 40px;
    background-color: #f7f7fc;
  }
  .toolbar {
    position: absolute;
    display: inline-flex;
    align-items: center;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
}
</style>
