<template>
  <el-dialog
    title=""
    v-model="visible_"
    @close="handClose"
    :before-close="handClose"
  >
    <el-form :model="formModel">
      <el-form-item label="产品分类">
        <el-select v-model="formModel.feiLei" placeholder="请选择产品分类">
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称">
        <el-input v-model="formModel.feiLei" placeholder="请输入产品名称">
        </el-input>
      </el-form-item>
      <el-form-item label="产品卖点">
        <el-input
          v-model="formModel.feiLei"
          placeholder="产品卖点或简要介绍,10~30字最佳"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="销售价">
        <el-input v-model="formModel.feiLei" placeholder="请输入产品销售价格">
        </el-input>
      </el-form-item>
      <el-form-item label="划线价">
        <el-input v-model="formModel.feiLei" placeholder="请输入产品划线价格">
        </el-input>
      </el-form-item>
      <el-form-item label="产品库存">
        <el-input v-model="formModel.feiLei" placeholder="请输入产品库存">
        </el-input>
      </el-form-item>
      <el-form-item label="产品主图">
        <el-input v-model="formModel.feiLei" placeholder="请选择产品分类">
        </el-input>
      </el-form-item>
      <el-form-item label="产品轮播图">
        <el-input v-model="formModel.feiLei" placeholder="请选择产品分类">
        </el-input>
      </el-form-item>
      <el-form-item label="产品规格">
        <div class="specFlex" v-if="produceSize.length">
          <div v-for="(item1, index1) in produceSize" :key="index1">
            <div>
              <el-tag
                :key="index1"
                class="mx-1"
                closable
                @close="deleteSize(index1)"
              >
                {{ item1.specName }}
              </el-tag>
            </div>
            <el-tag
              v-for="(item2, index2) in item1.specTags"
              :key="index2"
              class="mx-1"
              closable
              :disable-transitions="false"
              @close="deleteTags(item2)"
            >
              {{ item2 }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="ml-1 w-20"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button
              v-else
              class="button-new-tag ml-1"
              size="small"
              @click="showInput"
            >
              + New Tag
            </el-button>
          </div>
        </div>
        <div v-if="state.sizeName">
          <div>
            <el-input
              style="width: 200px"
              v-model="specName"
              placeholder="请输入规格名称"
            >
            </el-input>
          </div>
          <el-input
            style="width: 200px"
            v-model="specValue"
            placeholder="请输入规格值"
          ></el-input>
          <div style="width: 200px; text-align: center">
            <el-button @click="sureAddSize">确认</el-button>
            <el-button @click="cancelAddSize">取消</el-button>
          </div>
        </div>
        <el-button v-else type="" @click="addSize">添加规格</el-button>
      </el-form-item>
      <el-form-item label="图文详情">
        <el-input v-model="formModel.feiLei" placeholder="请选择产品分类">
        </el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { computed, ref, nextTick } from 'vue';

export default {
  setup(props, { emit }) {
    let formModel = ref({});
    const visible_ = computed(() => {
      console.log('asdf');
      return props.visible;
    });

    const handClose = () => {
      emit('close');
    };

    let produceSize = ref([]); // 产品规格

    const cancelAddSize = () => {
      specName.value = '';
      specValue.value = '';
      state.value.sizeName = false;
    };
    const sureAddSize = () => {
      produceSize.value.push({
        specName: specName.value,
        specTags: [specValue.value],
      });
      specName.value = '';
      specValue.value = '';
      state.value.sizeName = false;
    };

    const deleteSize = (index1) => {
      produceSize.value.splice(index1, 1);
    };

    const state = ref({
      sizeName: false,
      specValue: false,
      sizeTable: false,
    });

    let specTags = ref([]);
    const inputValue = ref('');
    const inputVisible = ref(false);
    const InputRef = ref();
    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        InputRef.value!.input!.focus();
      });
    };
    const handleInputConfirm = () => {
      if (inputValue.value) {
        specTags.value.push(inputValue.value);
      }
      inputVisible.value = false;
      inputValue.value = '';
    };
    const deleteTags = (tag: string) => {
      specTags.value.splice(specTags.value.indexOf(tag), 1);
    };

    const specName = ref('');
    const specValue = ref('');

    const addSize = () => {
      state.value.sizeName = true;
    };

    return {
      visible_,
      handClose,
      formModel,
      addSize,
      state,
      specTags,
      deleteTags,
      inputValue,
      showInput,
      InputRef,
      inputVisible,
      handleInputConfirm,
      cancelAddSize,
      specName,
      specValue,
      sureAddSize,
      produceSize,
      deleteSize,
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
