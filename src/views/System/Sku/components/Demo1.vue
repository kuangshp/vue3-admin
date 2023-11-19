<template>
  <div class="sku">
    <el-card shadow="never">
      <el-form>
        <el-form-item label="销售属性">
          <el-card
            shadow="never"
            v-for="(item, index) of skuAttributes"
            :key="index"
            :gutter="20"
            class="sku-row"
          >
            <el-button type="danger" class="delete-row-btn" @click="deleteRowHandler(index)"
              >删除</el-button
            >
            <el-row :gutter="10">
              <el-col :span="2">属性名称:</el-col>
              <el-col :span="8">
                <!-- <el-input v-model="item.title" placeholder="请输入属性名称"></el-input> -->
              </el-col>
            </el-row>
            <!-- <el-row :gutter="10" style="margin-top: 20px">
              <el-col :span="2"> 属性值: </el-col>
              <el-col :span="3" v-for="(text, i) of item.values" :key="i" class="sku-value-item">
                <el-icon class="close-icon" @click="deleteItemHandler(index, i)"
                  ><CircleCloseFilled color="#f00"
                /></el-icon>
                <el-input v-model="text.attributeValue" placeholder="属性值"></el-input
              ></el-col>
              <el-button
                type="primary"
                style="margin-left: 10px"
                @click="addAttributeHandler(index)"
                >添加属性</el-button
              >
            </el-row> -->
          </el-card>
          <div>
            <el-button type="primary" @click="addSkuAttrHandler">增加销售属性</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
  import { SkuService } from '@/services';
  import { ref, onMounted } from 'vue';
  const skuAttributes = ref([]);
  // 添加属性
  const addSkuAttrHandler = () => {};
  // 删除
  const deleteRowHandler = (index) => {
    skuAttributes.value.splice(index, 1);
  };
  // 1.获取全部的销售属性
  const getAllAttrApi = async () => {
    const data = await SkuService.getPropertyListApi();
    console.log(data, '获取到的数据');
  };
  onMounted(() => {
    getAllAttrApi();
  });
</script>

<style lang="scss" scoped>
  .sku-row {
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    .delete-row-btn {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      z-index: 30;
    }
    .sku-value-item {
      margin-bottom: 10px;
      position: relative;
      .close-icon {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 10;
        cursor: pointer;
        opacity: 0;
      }
      &:hover {
        .close-icon {
          opacity: 1;
        }
      }
    }
  }
</style>
