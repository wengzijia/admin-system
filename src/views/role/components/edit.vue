<template>
  <el-card>
    <el-button @click="goBreak">返回</el-button>
    <el-tree
      :data="treeData"
      show-checkbox
      node-key="menuId"
      default-expand-all
      :props="defaultProps"
      :default-checked-keys="ids_"
      @check="checkTree"
    >
      <template #default="{ node }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span style="padding-left: 50px">
            <el-checkbox label="Option 1" size="large" />
            <el-checkbox label="Option 2" size="large" />
          </span>
        </span>
      </template>
    </el-tree>
    <el-button @click="goBreak">取消</el-button>
    <el-button @click="submit">确定</el-button>
  </el-card>
</template>

<script>
import { ref, defineComponent, computed } from 'vue';
import { queryMenuAPI } from '@/api/router';
import { updateRoleAPI } from '@/api/role';

export default defineComponent({
  emits: ['goBreak'],
  setup(props, context) {
    const treeData = ref();
    const defaultProps = {
      label: 'menuName',
      children: 'childNode',
    };
    const ids_ = computed(() => {
      return props.ids;
    });
    // const data_ = computed(() => {
    //   return props.data;
    // });
    queryMenuAPI().then((res) => {
      treeData.value = res.data.menuNodes;
    });

    const goBreak = () => {
      context.emit('goBreak');
    };

    let checkedKeys = [];
    const submit = () => {
      let data = props.data;
      data.menuIds = checkedKeys;
      updateRoleAPI(data).then((res) => {
        console.log(res);
      });
      context.emit('goBreak');
    };

    const checkTree = (node, data) => {
      checkedKeys = data.checkedKeys;
    };

    return {
      treeData,
      defaultProps,
      ids_,
      goBreak,
      checkTree,
      submit,
    };
  },
  props: {
    ids: {
      type: Array,
      default: () => {
        return [];
      },
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
});
</script>
