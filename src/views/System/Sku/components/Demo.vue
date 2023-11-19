<template>
  <div class="sku">
    <!-- 头部面板 -->
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
                <el-input v-model="item.title" placeholder="请输入属性名称"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="margin-top: 20px">
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
            </el-row>
          </el-card>
          <div>
            <el-button type="primary" @click="addSkuAttrHandler">增加销售属性</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" style="margin-top: 20px">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="attributeValue" label="销售规格" width="180" />
        <el-table-column prop="price" label="单价">
          <template #default="scope">
            <el-input v-model="scope.row.price" placeholder="单价"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存">
          <template #default="scope">
            <el-input v-model="scope.row.stock" placeholder="库存"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" style="margin-top: 20px" @click="submitHandler">提交数据</el-button>
    </el-card>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { cloneDeep } from 'lodash';
  import { ElMessage } from 'element-plus';
  // 添加销售属性
  const skuAttributes = ref([]);
  const addSkuAttrHandler = () => {
    console.log('点击添加销售属性');
    skuAttributes.value.push({ title: '', values: [{ attributeValue: '', thumbnailUrl: '' }] });
  };
  const addAttributeHandler = (index) => {
    skuAttributes.value[index].values.push({ attributeValue: '', thumbnailUrl: '' });
  };
  // 删除行
  const deleteRowHandler = (index) => {
    skuAttributes.value.splice(index, 1);
  };
  // 删除某一个值的时候
  const deleteItemHandler = (index, i) => {
    skuAttributes.value[index].values.splice(i, 1);
  };

  // 表格数据
  const tableData = ref([]);
  watch(
    () => skuAttributes.value,
    (newValue) => {
      generateSku(cloneDeep(newValue));
    },
    {
      deep: true,
    }
  );
  // 监听sku表格的变化,并将当前sku进行备份
  const afterSku = ref([]);
  watch(
    () => tableData.value,
    (value) => {
      afterSku.value = cloneDeep(value);
    },
    { deep: true }
  );
  // 生成sku数据
  const generateSku = (skuAttribute) => {
    console.log(JSON.stringify(skuAttribute));
    const attrValue = [];
    for (const item of skuAttribute) {
      attrValue.push(item.values);
    }
    console.log(attrValue, '111');

    let skuList = [];
    if (attrValue.length == 0) {
      tableData.value = [];
      return;
    }
    // 循环组成sku数据
    skuList = attrValue
      .reduce((pre, cur) => {
        let res = [];
        for (const item of pre) {
          for (const it of cur) {
            let t = item.attributeValue + ',' + it.attributeValue;
            res.push({
              attributeValue: t,
              thumbnailUrl: item.thumbnailUrl || it.thumbnailUrl || '',
            });
          }
        }
        return res;
      })
      .map((it) => {
        const oldData = afterSku.value.find((item) => item.attributeValue == it.attributeValue);
        return {
          ...it,
          id: oldData ? oldData.id : '',
          price: oldData ? oldData.price : '',
          stock: oldData ? oldData.stock : '',
        };
      });
    console.log(skuList, '11');
    tableData.value = skuList;
  };

  const submitHandler = () => {
    ElMessage.success('请查看浏览器控制台');
    console.log('销售属性:', JSON.stringify(skuAttributes.value));
    console.log('表格数据:', JSON.stringify(tableData.value));
  };
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
