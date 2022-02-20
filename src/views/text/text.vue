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
        <el-table-column prop="menuId" label="菜单ID" sortable />
        <el-table-column prop="" label="菜单层级" sortable />
        <el-table-column prop="menuName" label="菜单名称" sortable />
        <el-table-column prop="pageUrl" label="菜单路径" sortable />
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
    <dialog_
      :dialogVisible="dialogVisible"
      :title="title"
      @close="dialogVisible = false"
      @updated="updated"
      :parentId="parentId"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { addMenuAPI, queryMenuAPI } from '@/api/router';
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
    console.log('sd', addMenuAPI());
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
