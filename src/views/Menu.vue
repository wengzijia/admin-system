<template>
  <el-container
    class="layout-container-demo"
    style="width: 100%; height: 100%; position: fixed"
  >
    <el-aside width="100px" class="personal">
      <div style="text-align: center; margin-top: 20px">
        <el-avatar :size="50" :src="circleUrl" />
      </div>
      <div style="width: 50px; height: 50px">
        <Icon :icon="iconName"></Icon>
      </div>
    </el-aside>
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="1-1">
                <router-link to="/about"> 账号管理 </router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/imageSpace"> 图片空间 </router-link>
              </el-menu-item>
              <el-menu-item index="1-10">
                <router-link to="/home"> 小程序首页 </router-link>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3"
                ><router-link to="/setting">
                  首页设置
                </router-link></el-menu-item
              >
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">
                <router-link to="/router"> 路由 </router-link>
              </el-menu-item>
              <el-menu-item index="1-4-2">
                <router-link to="/role"> 角色 </router-link>
              </el-menu-item>
              <el-menu-item index="1-4-3">
                <router-link to="/user"> 用户 </router-link>
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <div :body-style="{ padding: '20px', width: '100%', height: '100%' }">
            <router-view></router-view>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { ref } from 'vue';
import { queryMenuAPI } from '@/api/router';

export default {
  setup() {
    const menuData = ref();
    queryMenuAPI().then((res) => {
      console.log('menu=>', res);
    });

    const iconName = 'Search';
    return {
      menuData,
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      iconName,
    };
  },
};
</script>

<style scoped lang="scss">
.personal {
  background-color: rgba(0, 21, 41, 1);
}
.icon {
  width: 50px;
  height: 50px;
  color: aliceblue;
}
</style>
