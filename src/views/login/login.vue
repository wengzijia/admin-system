<template>
  <div class="content">
    <div class="content_input">
      <div class="title">
        <p>管理员登录</p>
      </div>
      <el-input v-model="UserName" clearable placeholder="用户名"></el-input>
      <el-input
        v-model="PassWord"
        clearable
        show-password
        placeholder="密码"
      ></el-input>
      <div class="content_button">
        <el-button type="primary" @click="SignIn">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return;
  },
});
</script>

<style scoped>
@import url('./css/style.css');
</style>
