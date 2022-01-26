<template>
  <div>
    <div style="height: 30px">
      <el-row>
        <el-col :span="6"> 菜单列 </el-col>
        <el-col :span="18"> title </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="6">
        <el-tree
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          :data="data"
          draggable
          default-expand-all
          node-key="id"
          @node-drag-start="handleDragStart"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          @node-contextmenu="rightClick"
          @node-click="nodeClick"
        >
        </el-tree>
        <div
          id="menu"
          v-show="menuVisible"
          @mouseleave="menuVisible = !menuVisible"
        >
          <el-card class="box-card">
            <div class="text item">
              <el-link :underline="false" :icon="FolderAdd"> 添加</el-link>
            </div>
            <div class="text item">
              <el-link :underline="false" :icon="DeleteFilled">删除</el-link>
            </div>
            <div class="text item">
              <el-link :underline="false" :icon="EditPen">编辑</el-link>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-col
            v-for="(item, index) in children"
            :key="index"
            :span="5"
            style="
              background: #8c8c8c;
              height: 180px;
              margin-left: 10px;
              margin-top: 10px;
            "
          >
            <el-icon :size="140"><folder /></el-icon>
            <div class="flex-center">
              <p style="text-align: center">{{ item.label }}</p>
              <p style="text-align: center">添加时间</p>
            </div>
          </el-col>

          <el-col
            v-for="item in 5"
            :key="item"
            :span="5"
            style="
              background: #8c8c8c;
              height: 180px;
              margin-left: 10px;
              margin-top: 10px;
            "
          >
            <el-image
              style="width: 100%; height: 140px"
              :src="url"
              :preview-src-list="srcList"
              :initial-index="1"
            />
            <div class="flex-center">
              <p style="text-align: center">图片名称</p>
              <p style="text-align: center">添加时间</p>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node';
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode';
import type { DropType } from 'element-plus/es/components/tree/src/tree.type';
import { ref } from 'vue-demi';
import {
  FolderAdd,
  DeleteFilled,
  EditPen,
  Folder,
} from '@element-plus/icons-vue';

const handleDragStart = (node: Node, ev: DragEvents) => {
  console.log('drag start', node);
};
const handleDragEnd = (
  draggingNode: Node,
  dropNode: Node,
  dropType: DropType,
  ev: DragEvents
) => {
  console.log('tree drag end: ', dropNode && dropNode.label, dropType);
};
const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: DropType,
  ev: DragEvents
) => {
  console.log('tree drop: ', dropNode.label, dropType);
};
const allowDrop = (draggingNode: Node, dropNode: Node, type: DropType) => {
  if (dropNode.data.label === 'Level two 3-1') {
    return type !== 'inner';
  } else {
    return true;
  }
};
const allowDrag = (draggingNode: Node) => {
  return draggingNode.data.label.indexOf('Level three 3-1-1') === -1;
};

const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
const srcList = [
  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
];

let children = ref([]); // 文件子集
const nodeClick = (item) => {
  children.value = item.children;
};

const data = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
let menuVisible = ref(false);
function rightClick(MouseEvent: any, object: any, Node: any, element: any) {
  debugger;
  menuVisible.value = true;
  let menu: any = document.querySelector('#menu');
  menu.style.cssText =
    'position: fixed; left: ' +
    (MouseEvent.clientX - 10) +
    'px' +
    '; top: ' +
    (MouseEvent.clientY - 25) +
    'px; z-index: 999; cursor:pointer;';
}
function treeAdd() {
  alert('add');
}
function treeRemove() {
  menuVisible.value = true;
}
</script>
