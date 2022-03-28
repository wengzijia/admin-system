<template>
  <div>
    <ap-list :column="column" :data="modelData">
      <template #commodityName>
        <div>
          <input type="text" style="width: 100%" />
        </div>
      </template>
    </ap-list>
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
import apSelect from '@/components/ap-select/index.vue';
import { queryMenuAPI } from '@/api/router';

export default {
  components: {
    apList,
    apSelect,
  },
  setup() {
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
      column,
      modelData: [
        {
          commodityName: 123,
          className: '类目',
          unit: 'unit',
          status: 'state',
          time: 'time',
        },
      ],
      queryMenuAPI_,
      outputArray: ['data', 'menuNodes'],
      menuId: 'menuId',
    };
  },
};
</script>
