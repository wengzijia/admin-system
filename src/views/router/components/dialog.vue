<template>
  <el-dialog
    v-model="visible_"
    :title="title_"
    :width="width"
    :before-close="handleClose"
  >
    <el-form :model="formModel" ref="formRef" :rules="rules">
      <el-form-item label="父级:" prop="parentId" v-if="state_ === 'add'">
        <el-cascader
          :options="options"
          v-model="formModel.parentId"
          :props="props1"
          clearable
          @change="changeCascader"
        />
        <p>ps: 当父级为空时，添加的菜单为一级菜单</p>
      </el-form-item>
      <el-form-item label="菜单名称:" prop="menuName">
        <el-input v-model="formModel.menuName" style="width: 214px"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径:" prop="pageUrl">
        <el-input v-model="formModel.pageUrl" style="width: 214px"></el-input>
      </el-form-item>
      <el-form-item label="菜单唯一ID:">
        <el-input style="width: 214px"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <slot name="footer">
        <span>
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { addMenuAPI, queryMenuAPI, updateMenuAPI } from '@/api/router';

export default defineComponent({
  emits: ['close', 'refresh'],
  setup(props, context) {
    let formModel = ref({
      parentId: null,
      menuName: '',
      pageUrl: '',
      id: '',
    });

    const visible_ = computed(() => {
      return props.visible;
    });
    const state_ = computed(() => {
      return props.state;
    });

    const disabled = ref(false);

    watch(visible_, () => {
      getParenStatus = true;

      formModel.value.parentId = getParentId(props.parentId, options.value);
      // 根据状态 展示数据
      if (state_.value === 'add') {
        clear();
      } else if (state_.value === 'edit') {
        getData();
      }
    });

    const options = ref([]);
    queryMenuAPI().then((res) => {
      options.value = res.data.menuNodes;
    });

    let getParenStatus = true;
    // 选找路由对应路由地址
    const getParentId = (id, arr) => {
      let parentId = [];
      arr.map((item) => {
        if (item.menuId === id) {
          parentId.push(item.menuId);
          getParenStatus = false;
        }
        if (item.childNode.length > 0 && getParenStatus) {
          parentId.push(item.menuId);
          let ar = getParentId(id, item.childNode);
          parentId.push(...ar);
        }
      });
      console.log('parentId', parentId);
      return parentId;
    };

    const clear = () => {
      formModel.value.menuName = '';
      formModel.value.pageUrl = '';
    };
    const getData = () => {
      formModel.value.id = props.data.menuId;
      formModel.value.menuName = props.data.menuName;
      formModel.value.pageUrl = props.data.pageUrl;
    };

    const width_ = ref(props.width);
    const title_ = '新增';
    const formRef = ref();

    const handleClose = () => {
      context.emit('close');
    };

    const submit = () => {
      formRef.value.validate((valid) => {
        let data = formModel.value;
        if (valid) {
          data.parentId = data.parentId[data.parentId.length - 1];
          if (props.state === 'add') {
            addMenuAPI(data).then(() => {
              context.emit('refresh');
            });
          } else {
            if (data.id === data.parentId) {
              data.parentId = 0; // 相同则为第一层
            }
            updateMenuAPI(data).then(() => {
              context.emit('refresh');
            });
          }
        } else {
          console.log('error refresh!');
          return false;
        }
      });
    };

    const changeCascader = (value) => {
      console.log('changeCascader', value);
    };

    return {
      options,
      visible_,
      width_,
      title_,
      formModel,
      formRef,
      handleClose,
      submit,
      changeCascader,
      disabled,
      state_,
      rules: {
        menuName: [
          {
            required: true,
            message: '请输入菜单名称',
            trigger: 'change',
          },
        ],
        pageUrl: [
          {
            required: true,
            message: '请输入菜单路径',
            trigger: 'change',
          },
        ],
      },
      props1: {
        checkStrictly: true,
        value: 'menuId',
        label: 'menuName',
        children: 'childNode',
      },
    };
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '30%',
    },
    parentId: {
      type: [Number],
      default: null,
    },
    state: {
      type: String,
      default: 'add',
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
