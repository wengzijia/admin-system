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
        label: 'as',
      },
      {
        name: 'as',
        model: 'as',
        label: 'ass',
      },
    ]);
    return {
      column,
    };
  },
};
</script>
