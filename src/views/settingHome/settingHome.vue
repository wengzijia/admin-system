<template>
  <div>
    <ap-list :column="column"></ap-list>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import apList from '@/components/ap-list/index.vue';
export default {
  components: {
    apList,
  },
  setup() {
    let column = ref([
      {
        name: 'as',
        model: 'as',
        label: '商品分类',
      },
      {
        name: 'as',
        model: 'as',
        label: '商品名称',
      },
      {
        name: 'as',
        model: 'as',
        label: '商品图片',
      },
      {
        name: 'as',
        model: 'as',
        label: '商品编码',
      },
      {
        name: 'as',
        model: 'as',
        label: '商品价格',
      },
      {
        name: 'as',
        model: 'as',
        label: '商品库存',
      },
      {
        name: 'as',
        model: 'as',
        label: '商品状态',
      },
      {
        name: 'as',
        model: 'as',
        label: '更新时间',
      },
    ]);
    return {
      column,
    };
  },
};
</script>
