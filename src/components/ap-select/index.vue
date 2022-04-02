<template>
  <el-select
    v-model="model"
    value-key=""
    placeholder="请选择"
    clearable
    filterable
    @change="changeSelect"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    let model = ref();
    // 先将数据初始化
    let options = ref(props.option);
    // 判断是否需要发送请求
    if (props.api !== null) {
      props.api(props.inputObject).then((res) => {
        let arr = res;
        // 根据数据结构读取数据
        props.outputArray.forEach((item) => {
          arr = arr[item];
        });
        // 根据 key，label 进行数据处理
        options.value = arr.map((item) => {
          let data = {
            value: item[props.key],
            label: item[props.label],
          };
          return data;
        });
      });
    }

    const changeSelect = (val) => {
      emit('input', val);
    };
    return { model, changeSelect, options };
  },
  props: {
    // 请求方法
    api: {
      type: Promise,
      default: () => {
        return null;
      },
    },
    // 请求入参
    inputObject: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 回参 读取格式
    outputArray: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 下拉数组
    option: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 下拉数据 key 值
    value: {
      type: String,
      default: () => {
        return 'value';
      },
    },
    // 下拉数据 label 值
    label: {
      type: String,
      default: () => {
        return 'label';
      },
    },
    // 绑定数据
    // value: {
    //   type: [String, Array],
    //   default: () => {
    //     return '';
    //   },
    // },
  },
};
</script>
