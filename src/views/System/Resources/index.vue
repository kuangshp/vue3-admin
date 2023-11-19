<template>
  <div
    >资源中心
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      :limit="1"
      :on-change="handleExceed"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <el-button style="margin-left: 30px; margin-right: 30px" type="success" @click="submitUpload">
        上传
      </el-button>
      <el-button type="success" @click="bs64UploadHandler">使用BS64上传</el-button>
    </el-upload>
  </div>
</template>

<script setup>
  console.log('资源管理');
  import { ref } from 'vue';
  import axios from 'axios';
  import md5 from 'js-md5';

  const fileRef = ref(null);

  const handleExceed = (files) => {
    console.log(files);
    fileRef.value = files;
  };

  const updateFile = (shardIndex) => {
    const formData = new FormData();
    const file = fileRef.value.raw;
    // 文件分配
    let shardSize = 5 * 1024 * 1024; // 以5MB为一个分片
    // let shardIndex = 0; // 分片索引
    let start = (shardIndex - 1) * shardSize; // 开始位置
    let end = Math.min(file.size, start + shardSize); // 结束位置
    let fileShard = file.slice(start, end); // 每次上传的分片数据
    // 前端多上传参数
    let size = file.size;
    let shardTotal = Math.ceil(size / shardSize); // 总片数
    const suffix = file.name.substring(file.name.lastIndexOf('.') + 1);
    formData.append('shard', fileShard);
    formData.append('shardIndex', shardIndex);
    formData.append('shardSize', shardSize);
    formData.append('shardTotal', shardTotal);
    formData.append('name', file.name);
    formData.append('size', size);
    formData.append('suffix', suffix); // 默认写死一个
    formData.append('key', md5(`${file.name}_${file.size}_${file.type}`));

    axios.post('http://localhost:9002/file/upload1', formData).then((res) => {
      // 判断如果当前的shardIndex < shardTotal的时候递归上传
      if (shardIndex < shardTotal) {
        updateFile(++shardIndex);
      } else {
        console.log('上传成功');
      }
    });
  };
  const submitUpload = () => {
    console.log('开始上传文件', JSON.stringify(fileRef.value));
    const file = fileRef.value.raw;
    const key = md5(`${file.name}_${file.size}_${file.type}`);
    axios.get(`http://localhost:9002/file/${key}`).then((response) => {
      if (response.data > 0) {
        updateFile(response.data + 1);
      } else {
        updateFile(1);
      }
    });
  };
  // 使用BS64上传
  const bs64UploadHandler = () => {
    const file = fileRef.value.raw;
    let fileReader = new FileReader();
    fileReader.onload = function (e) {
      const base64 = e.target.result;
      console.log('base64', base64);
      const suffix = file.name.substring(file.name.lastIndexOf('.') + 1);
      axios
        .post('http://localhost:9002/file/bs64Upload', {
          fileName: md5(`${file.name}_${file.size}_${file.type}`) + '.' + suffix,
          fileBs64: base64,
        })
        .then((res) => {
          console.log(res);
        });
    };
    fileReader.readAsDataURL(file);
  };
</script>

<style lang="scss" scoped></style>
