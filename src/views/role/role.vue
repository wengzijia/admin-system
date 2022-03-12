<template>
  <div>
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'childNode' }"
      >
        <el-table-column prop="roleName" label="角色名称" sortable />
        <el-table-column prop="sortNum" label="排序号" sortable />
        <el-table-column prop="roleDesc" label="角色描述" sortable />
        <el-table-column prop="state" label="状态" sortable />
        <el-table-column label="操作列">
          <template #default="scope">
            <el-button size="small" type="text" @click="handAdd(scope.row)"
              >新增</el-button
            >
            <el-button
              size="small"
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { queryRoleAPI } from '@/api/role';

export default defineComponent({
  setup() {
    const tableData = ref([]);

    const getTableDate = () => {
      queryRoleAPI().then((res) => {
        tableData.value = res.data;
      });
    };
    getTableDate();
    const formModel = {};
    const dialogVisible = ref(false);
    const title = ref('');
    const parentId = ref();
    const handAdd = (row) => {
      dialogVisible.value = true;
      title.value = '新增';
      parentId.value = row.menuId;
    };
    const updated = () => {
      getTableDate();
      dialogVisible.value = false;
    };
    return {
      tableData,
      formModel,
      dialogVisible,
      title,
      parentId,
      handAdd,
      updated,
    };
  },
});
</script>
