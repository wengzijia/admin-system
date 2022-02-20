<template>
  <el-dialog
    v-model="dialogVisible_"
    :title="title_"
    :width="width_"
    :before-close="handleClose"
  >
    <el-form :model="formModel" ref="formRef" :rules="rules">
      <el-form-item label="父级:" prop="parentId">
        <el-cascader
          :options="options"
          v-model="formModel.parentId"
          :props="props1"
          clearable
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
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { addMenuAPI, queryMenuAPI } from '@/api/router';

export default defineComponent({
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 's',
    },
    width: {
      type: String,
      default: '30%',
    },
    parentId: {
      type: [Number, String],
      default: null,
    },
  },
  setup(props, context) {
    const dialogVisible_ = computed(() => {
      return props.dialogVisible;
    });
    const title_ = ref(props.title);
    const width_ = ref(props.width);

    const formModel = ref({});
    const formRef = ref();
    const rules = ref({
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
    });

    const options = ref([]);
    queryMenuAPI().then((res) => {
      options.value = res.data.menuNodes;
    });
    const props1 = {
      checkStrictly: true,
      value: 'menuID',
      label: 'menuName',
    };

    const handleClose = () => {
      context.emit('close');
    };

    const submit = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          addMenuAPI(formModel.value).then(() => {
            context.emit('updated');
          });
        } else {
          console.log('error submit!');
          return false;
        }
      });
    };
    return {
      options,
      dialogVisible_,
      width_,
      title_,
      props1,
      formModel,
      rules,
      formRef,
      handleClose,
      submit,
    };
  },
});
</script>
