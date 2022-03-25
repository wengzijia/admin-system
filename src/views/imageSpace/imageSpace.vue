<template>
  <div>
    <div style="height: 30px">
      <el-row>
        <el-col :span="6"> 菜单列 </el-col>
        <el-col :span="18"> 当前所属：{{ fileName }} </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="6">
        <el-tree
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          :data="treeModel"
          draggable
          default-expand-all
          node-key="id"
          @node-drag-start="handleDragStart"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          @node-contextmenu="rightClick"
          @node-click="nodeClick"
          :props="{ label: 'imgFileName', children: 'childNode' }"
        >
        </el-tree>
        <div
          id="menu"
          v-show="menuVisible"
          @mouseleave="menuVisible = !menuVisible"
        >
          <el-card class="box-card">
            <div class="text item" @click="addFile">
              <el-link :underline="false" :icon="FolderAdd"> 添加</el-link>
            </div>
            <div class="text item">
              <el-link :underline="false" :icon="EditPen">编辑</el-link>
            </div>
            <div class="text item" @click="deleteFile(2)">
              <el-link :underline="false" :icon="DeleteFilled">删除</el-link>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18">
        <el-row>
          <!-- 文件夹 -->
          <el-col
            v-for="(item, index) in filesData"
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
              <p style="text-align: center">{{ item.imgFileName }}</p>
            </div>
          </el-col>
          <!-- 图片 -->
          <el-col
            v-for="item in imagesData"
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
              :src="item.url"
              :preview-src-list="imagesList"
              :initial-index="1"
            />
            <div class="flex-center">
              <p style="text-align: center">{{ item.name }}</p>
            </div>
          </el-col>
          <!-- 上传 -->
          <el-col
            style="height: 180px; margin-left: 10px; margin-top: 10px"
            :span="5"
          >
            <el-upload
              action="http://101.43.46.172:9901/bjcc/img/fileUpload"
              class="avatar-uploader"
              :data="{ imgId: 3 }"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :headers="headers"
            >
              <el-icon class="avatar-uploader-icon"><plus /></el-icon>
            </el-upload>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <fileDialog :visible="Visible" @close="dialogClose" :id="fileId" />
  </div>
</template>

<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node';
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode';
import type { DropType } from 'element-plus/es/components/tree/src/tree.type';
import { ref } from 'vue-demi';
import { queryAllFile, fileDelAPI } from '@/api/imageSpace';
import { ElMessageBox, ElMessage } from 'element-plus';
import {
  FolderAdd,
  DeleteFilled,
  EditPen,
  Folder,
  Plus,
} from '@element-plus/icons-vue';
import fileDialog from './components/fileDialog.vue';

const treeModel = ref([]);
let fileName = ref(null);
const getTreeData = () => {
  queryAllFile().then((res) => {
    console.log(res.data.fileNodeRespList);
    treeModel.value = res.data.fileNodeRespList;
    fileName.value = treeModel.value[0].imgFileName;
    nodeClick(treeModel.value[0]);
  });
};
getTreeData();
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

// 文件夹 新增
const Visible = ref(false);
const addFileId = ref(false);
const fileId = ref(null);
const imgFileName = ref(null);
const addFile = () => {
  Visible.value = true;
  addFileId.value = fileId;
  console.log('as', Visible.value);
};
const deleteFile = (type) => {
  if (!type) return;
  ElMessageBox.confirm('This is a message', 'Title', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  })
    .then(() => {
      fileDelAPI({
        fileType: type,
        parentImgId: 3,
        fileName: imgFileName.value,
      }).then((res) => {
        res.code === 200 &&
          ElMessage({
            type: 'success',
            message: '删除成功',
          });

        getTreeData();
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      });
    });
};

let children = ref([]); // 文件子集
let filesData = ref([]);
let imagesData = ref([]);
let imagesList = ref([]);
const nodeClick = (item) => {
  filesData.value = item.childNode;
  imagesData.value = item.fileDtoList;
  imagesList.value = item.fileDtoList.map((item) => item.url);
  children.value = item.children;
  fileName.value = item.imgFileName;
};

// 上传图片
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 5;
  console.log('file:', file);
  return true;
};

const headers = {
  token: localStorage.getItem('token'),
  contentType: 'multipart/form-data',
};

const handleAvatarSuccess = (res) => {
  imagesData.value = res.data.fileDtoList;
  imagesList.value = imagesData.value.map((item) => item.url);
};

const dialogClose = () => {
  Visible.value = false;
  getTreeData();
};

let menuVisible = ref(false);
function rightClick(MouseEvent: any, object: any, Node: any, element: any) {
  fileId.value = object.fileId;
  imgFileName.value = object.imgFileName;
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
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
