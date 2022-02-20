<template>
  <div>
    <!-- 查询栏 -->
    <el-form ref="formRef" :model="searchForm" :inline="true">
      <el-form-item
        :label="item.label"
        v-for="(item, index) in searchArray"
        :key="index"
      >
        <slot>
          <el-input
            v-if="item.type === 'input'"
            v-model="searchForm[item.model]"
            :placeholder="item.placeholder ? item.placeholder : '请输入'"
          ></el-input>
          <el-select
            v-if="item.type === 'select'"
            v-model="searchForm[item.model]"
            :placeholder="item.placeholder ? item.placeholder : '请选择'"
          >
            <el-option></el-option>
          </el-select>
        </slot>
      </el-form-item>
      <!-- 搜索按钮 -->
      <el-button>搜索</el-button>
      <el-button>重置</el-button>
      <el-button>更多搜索</el-button>
    </el-form>
    <!-- 列表 -->
    <el-table :data="tableData" border style="width: 100%">
      <!-- 生成列 -->
      <template v-for="(item, index) in columns" :key="index">
        <el-table-column :prop="item.name" :width="item.width">
          <!-- 自定义表头 -->
          <template v-slot:header>
            <slot :name="`col-${item.name}-header`">
              {{ item.label }}
            </slot>
          </template>
          <!-- 列 -->
          <template #default="{ row }">
            <slot :name="'col-' + col.name" :row="row">{{
              row[col.name]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  props: {
    // 列头
    column: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 列表数据
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 搜索表单
    searchArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    let columns = ref(props.column);
    let tableData = ref(props.data);
    let searchArray = ref(props.searchArr);
    let searchForm = ref([]);
    let formRef = ref();
    return {
      searchForm,
      columns,
      tableData,
      formRef,
      searchArray,
    };
  },
};
</script>
