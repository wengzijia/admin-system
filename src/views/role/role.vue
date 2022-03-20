<template>
  <div>
    <el-card v-if="edit_">
      <el-button>新增</el-button>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :default-checked-keys="ids_"
        :tree-props="{ children: 'childNode' }"
      >
        <el-table-column prop="roleName" label="角色名称" sortable />
        <el-table-column prop="sortNum" label="排序号" sortable />
        <el-table-column prop="roleDesc" label="角色描述" sortable />
        <el-table-column prop="state" label="状态" sortable />
        <el-table-column prop="state" label="更新时间" sortable />
        <el-table-column label="操作列">
          <template #default="scope">
            <el-button size="small" type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <apEdit @goBreak="edit_ = true" :ids="ids" :data="editData" v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { queryRoleAPI } from '@/api/role';

import apEdit from './components/edit.vue';

export default defineComponent({
  components: {
    apEdit,
  },
  setup() {
    const tableData = ref([]);
    const getTableDate = () => {
      queryRoleAPI().then((res) => {
        tableData.value = res.data;
      });
    };
    getTableDate();

    let edit_ = ref(true);
    let ids = ref([]);
    let editData = ref({});
    const handleEdit = (row) => {
      if (row.menuIds === null || row.menuIds.length === 0) {
        ids.value = [];
      } else {
        ids.value = row.menuIds.map((item) => {
          return Number(item);
        });
      }
      editData.value = row;
      edit_.value = false;
    };
    return {
      tableData,
      edit_,
      ids,
      editData,
      handleEdit,
    };
  },
});
</script>
