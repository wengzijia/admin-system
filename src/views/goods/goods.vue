<template>
  <div>
    <ap-list :searchArr="searchArray" :column="column" :data="modelData">
      <template #searchBtn>
        <el-button type="" @click="add">添加</el-button>
      </template>
      <template #commodityName>
        <div>
          <input type="text" style="width: 100%" />
        </div>
      </template>
    </ap-list>
    <dataBox :visible="visible" />
    <apSelect
      :api="queryMenuAPI_"
      :outputArray="outputArray"
      value="menuId"
      label="menuName"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import apList from '@/components/ap-list/index.vue';
import dataBox from './components/dataBox.vue';
import apSelect from '@/components/ap-select/index.vue';
import { queryMenuAPI } from '@/api/router';

export default {
  components: {
    apList,
    dataBox,
  },
  setup() {
    let visible = ref(false);

    const add = () => {
      visible.value = true;
    };

    const close = () => {
      visible.value = false;
    };

    let column = ref([
      {
        name: 'commodityName',
        label: '商品/价格',
      },
      {
        name: 'className',
        label: '商品类目',
      },
      {
        name: 'unit',
        label: '库存单位',
      },
      {
        name: 'status',
        label: '商品状态',
      },
      {
        name: 'time',
        label: '创建时间',
      },
      {
        name: 'as',
        label: '操作',
      },
    ]);

    const queryMenuAPI_ = ref(queryMenuAPI);
    return {
      visible,
      add,
      close,
      modelData: [
        {
          commodityName: 123,
          className: '类目',
          unit: 'unit',
          status: 'state',
          time: 'time',
        },
      ],
      column: [
        {
          name: 'commodityName',
          label: '产品图片',
        },
        {
          name: 'className',
          label: '产品名称',
        },
        {
          name: 'unit',
          label: '分类',
        },
        {
          name: 'status',
          label: '价格',
        },
        {
          name: 'time',
          label: '销量',
        },
        {
          name: 'time',
          label: '浏览量',
        },
        {
          name: 'time',
          label: '库存',
        },
        {
          name: 'time',
          label: '热门推荐',
        },
        {
          name: 'time',
          label: '是否上架',
        },
        {
          name: 'as',
          label: '操作',
        },
      ],
      searchArray: [
        {
          label: '所有分类',
          model: 'fenLei',
          type: 'select',
          option: [
            {
              value: '123',
              label: '猫猫粮',
            },
            {
              value: '456',
              label: '狗粮',
            },
          ],
        },
        {
          label: '所有状态',
          model: 'status',
          type: 'select',
          option: [
            {
              value: '123',
              label: '出售中',
            },
            {
              value: '456',
              label: '已下架',
            },
          ],
        },
        {
          label: '产品关键字',
          model: 'name',
          type: 'input',
        },
      ],
      queryMenuAPI_,
      outputArray: ['data', 'menuNodes'],
      menuId: 'menuId',
    };
  },
};
</script>
