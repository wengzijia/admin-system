<template>
  <div>
    <el-card :body-style="{ padding: '20px' }">
      <!-- 查询栏 -->
      <el-form ref="formRef" :model="searchForm" :inline="true">
        <el-form-item
          :label="item.label + ':'"
          v-for="(item, index) in searchArray"
          :key="index"
        >
          <slot>
            <el-input
              v-if="item.type === 'input'"
              v-model="searchForm[item.model]"
              :placeholder="item.placeholder ? item.placeholder : '请输入'"
            ></el-input>
            <apSelect
              v-else-if="item.type === 'select'"
              :option="item.option"
              :value="item.value || 'value'"
              :label="item.label || 'label'"
            />
          </slot>
        </el-form-item>
        <!-- 搜索按钮 -->
        <div style="display: flex; align-item: center">
          <slot name="searchBtn"> </slot>
          <el-button>搜索</el-button>
          <el-button>重置</el-button>
          <el-button>更多搜索</el-button>
        </div>
      </el-form>
    </el-card>

    <!-- 列表 -->
    <el-table :data="tableData" stripe style="width: 100%; margin-top: 10px">
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
            <slot :name="item.name" :row="row">{{ row[item.name] }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import apSelect from '@/components/ap-select/index.vue';

export default {
  components: {
    apSelect,
  },
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
