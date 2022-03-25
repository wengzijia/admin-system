<template>
  <div>
    <el-card>
      <el-button @click="handAdd">新增</el-button>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="menuId"
        border
        :tree-props="{ children: 'childNode' }"
      >
        <el-table-column prop="menuId" label="菜单ID" />
        <el-table-column prop="" label="菜单层级" />
        <el-table-column prop="menuName" label="菜单名称" />
        <el-table-column prop="pageUrl" label="菜单路径" />
        <el-table-column label="操作列">
          <template #default="scope">
            <el-button size="small" type="text" @click="handAdd(scope.row)"
              >新增</el-button
            >
            <el-button size="small" type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button size="small" type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <dialog_
      :visible="visible"
      @close="visible = false"
      @refresh="refresh"
      :parentId="parentId"
      :state="state"
      :data="dialogData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { queryMenuAPI, delMenuAPI } from '@/api/router';
import dialog_ from './components/dialog.vue';

export default defineComponent({
  components: {
    dialog_,
  },
  setup() {
    const tableData = ref([]);

    const getTableDate = () => {
      queryMenuAPI().then((res) => {
        tableData.value = res.data.menuNodes;
      });
    };
    getTableDate();
    const formModel = {};
    const visible = ref(false);
    const parentId = ref();
    let state = ref('add');
    let dialogData = ref();

    const handAdd = (row) => {
      state.value = 'add';
      parentId.value = row.menuId;
      visible.value = true;
    };

    const handleEdit = (row) => {
      state.value = 'edit';
      parentId.value = row.menuId;
      dialogData.value = row;
      visible.value = true;
    };

    const handleDelete = (row) => {
      console.log(row);

      let data = {
        id: row.menuId,
        menuName: row.menuName,
        pageUrl: row.menuName,
      };
      delMenuAPI(data).then(() => {
        getTableDate();
      });
    };

    const refresh = () => {
      getTableDate();
      visible.value = false;
    };
    return {
      tableData,
      formModel,
      visible,
      parentId,
      state,
      dialogData,
      handAdd,
      refresh,
      handleEdit,
      handleDelete,
    };
  },
});
</script>
