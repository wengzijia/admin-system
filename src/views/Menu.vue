<template>
  <el-container
    class="layout-container-demo"
    style="width: 100%; height: 100%; position: fixed"
  >
    <el-aside width="130px" class="personal">
      <div style="text-align: center; margin-top: 20px">
        <el-avatar :size="50" :src="circleUrl" />
      </div>
      <div style="height: 30px; margin-top: 30px">
        <div
          style="display: flex; align-items: center; margin: 15px 0px 0px 15px"
          v-for="(item, index) in menuData"
          :key="index"
          @click="clickMenu(item)"
        >
          <Icon :icon="iconName" style="margin-right: 5px"></Icon>
          {{ item.menuName }}
        </div>
      </div>
    </el-aside>
    <el-aside width="200px">
      <el-scrollbar>
        <div
          class="text"
          style="border-bottom: 1px solid; justify-content: space-between"
        >
          {{ menuName }}
          <Icon :icon="arrowLeft" style="margin-right: 5px; color: #333"></Icon>
        </div>
        <!-- <el-menu :default-openeds="['1', '3']">
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
        </el-menu> -->
        <div class="text hover" v-for="(item, index) in childNode" :key="index">
          <router-link :to="item.pageUrl">{{ item.menuName }}</router-link>
        </div>
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
    const menuData = ref([]);
    queryMenuAPI().then((res) => {
      console.log('menu=>');
      menuData.value = res.data.menuNodes;
    });

    let childNode = ref([]);
    let menuName = ref();
    const clickMenu = (row) => {
      menuName.value = row.menuName;
      childNode.value = row.childNode;
      console.log('childNode=>', childNode.value);
    };

    const iconName = 'Search';
    return {
      menuData,
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      iconName,
      clickMenu,
      childNode,
      menuName,
      arrowLeft: 'ArrowLeft',
    };
  },
};
</script>

<style scoped lang="scss">
.personal {
  background-color: rgba(0, 21, 41, 1);
}
.icon {
  width: 20px;
  height: 20px;
  color: aliceblue;
}
.text {
  display: flex;
  align-items: center;
  color: #303133;
  padding: 0px 20px 0px 20px;
  height: 56px;
}
.hover:hover {
  background-color: #ecf5ff;
}
.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
}
a:-webkit-any-link {
  color: #303133;
  cursor: pointer;
}
</style>
