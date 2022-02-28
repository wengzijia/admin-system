<template>
  <el-dialog
    :title="title"
    width="30%"
    :before-close="handleClose"
    v-model="visibleModel"
  >
    <el-form :model="formData" ref="formRef">
      <el-form-item
        label="文件名称"
        prop="imgFileName"
        :rules="[
          {
            required: true,
            message: '请输入文件名称',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="formData.imgFileName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" @click="submit(formRef)">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { reactive, computed, ref } from 'vue';
import { addImgFileAPI, fileUploadAPI } from '@/api/imageSpace';
export default {
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    title: {
      type: String,
      default: () => {
        return '新增';
      },
    },
    id: {
      type: Number,
      default: () => {
        return null;
      },
    },
  },
  setup(props, context) {
    let formData = reactive({
      parentId: null,
      imgFileName: '',
    });

    const visibleModel = computed(() => {
      console.log('visibleModel', props.visible);
      return props.visible;
    });
    formData.parentId = computed(() => props.id);
    const handleClose = () => {
      formData.parentId = null;
      formData.imgFileName = '';
      context.emit('close');
    };

    const formRef = ref();

    const submit = (formEl) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log('submit!', formData);
          addImgFileAPI(formData).then((res) => {
            if (res.code === 200) {
              handleClose();
            }
          });
        } else {
          console.log('error submit!');
          return false;
        }
      });
    };
    return {
      formData,
      visibleModel,
      formRef,
      submit,
      handleClose,
    };
  },
};
</script>
