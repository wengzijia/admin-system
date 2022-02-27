<template>
  <div class="content">
    <div class="content_input">
      <div class="title">
        <p>管理员登录</p>
      </div>
      <el-input
        v-model="user.username"
        clearable
        placeholder="用户名"
      ></el-input>
      <el-input
        v-model="user.password"
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
import { defineComponent, reactive, ref } from 'vue';
import { loginAPI } from '@/api/login';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const user = reactive({
      username: '',
      password: '',
      phone: null,
    });
    const router = useRouter();
    const SignIn = () => {
      loginAPI(user).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('token', res.data);
          router.push('/home');
        }
      });
    };
    return {
      user,
      SignIn,
    };
  },
});
</script>

<style scoped>
@import url('./css/style.css');
</style>
