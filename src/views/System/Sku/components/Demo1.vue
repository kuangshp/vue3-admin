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
                <el-select
                  v-model="item.id"
                  placeholder="请选择属性"
                  @change="changePropertyHandler"
                >
                  <el-option
                    v-for="item in propertyList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    :disabled="checkPropertyList.includes(item.id)"
                  />
                </el-select>
                <!-- <el-input v-model="item.title" placeholder="请输入属性名称"></el-input> -->
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2"> 属性值: </el-col>
              <el-col :span="22">
                <el-checkbox-group v-model="item.checkList">
                  <el-checkbox :label="value.id" v-for="(value, i) of item.propertyList" :key="i">{{
                    value.name
                  }}</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-card>
          <div>
            <el-button type="primary" @click="addSkuAttrHandler">增加销售属性</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面表格 -->
    <el-card shadow="never" style="margin-top: 20px">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="name" label="销售规格" width="180" />
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
  import { SkuService } from '@/services';
  import { ref, onMounted, watch } from 'vue';
  import { cloneDeep } from 'lodash';
  import { ElMessage } from 'element-plus';
  const skuAttributes = ref([]);
  // 添加属性
  const addSkuAttrHandler = () => {
    skuAttributes.value.push({
      id: null,
      propertyList: [],
      checkList: [],
    });
  };
  // 删除
  const deleteRowHandler = (index) => {
    skuAttributes.value.splice(index, 1);
  };
  // 1.获取全部的销售属性
  const propertyList = ref([]);
  const getAllAttrApi = async () => {
    const data = await SkuService.getPropertyListApi();
    propertyList.value = data.result;
  };
  // 切换的时候
  const changePropertyHandler = async (item) => {
    let currentItem = skuAttributes.value.find((it) => it.id == item);
    const currentIndex = skuAttributes.value.findIndex((it) => it.id == item);
    const data = await SkuService.getPropertyValueByPropertyIdApi(item);
    currentItem.propertyList = data.result;
    currentItem.name = propertyList.value.find((it) => it.id == item)?.name;
    // 替换之前的
    skuAttributes.value.splice(currentIndex, 1, currentItem);
  };
  // 表格数据
  const tableData = ref([]);
  const submitHandler = async () => {
    ElMessage.success('请查看浏览器控制台');
    console.log('销售属性:', JSON.stringify(skuAttributes.value));
    console.log('表格数据:', JSON.stringify(tableData.value));
    const postData = {
      name: '苹果13',
      keyword: '苹果手机',
      introduction: 'laboris sint in',
      categoryId: 10,
      brandId: 50,
      picUrl: 'http://dummyimage.com/400x400',
      videoUrl: 'http://voanozyj.vg/suuadzgv',
      sliderPicUrls: 'http://dummyimage.com/400x400',
      unit: 25,
      specType: 79,
      price: 90,
      marketPrice: 11,
      discountPrice: 82,
      vipPrice: 32,
      costPrice: 87,
      stock: 19,
      sort: 33,
      isHot: 0,
      isBenefit: 0,
      isBest: 0,
      isNew: 0,
      isGood: 0,
      giveIntegral: 43,
      content: '手机详情',
      remark: 'magna eu laboris',
      properties: JSON.stringify(skuAttributes.value),
      skuList: tableData.value.map((item) => {
        return {
          ...item,
          propertiesValue: item.name,
          barCode: item.name,
          discountPrice: item.price,
          costPrice: item.price,
          picUrl: 'http://dummyimage.com/400x400',
          vipPrice: item.price,
          volume: 85,
          marketPrice: 26,
          weight: 50,
        };
      }),
    };
    const data = await SkuService.createSpuApi(postData);
    console.log(data);
  };
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
  const checkPropertyList = ref([]);
  // 生成sku数据
  const generateSku = (skuAttribute) => {
    console.log(JSON.stringify(skuAttribute));
    const attrValue = [];

    // 获取选中的属性
    for (const item of skuAttribute) {
      attrValue.push(item.propertyList.filter((it) => item.checkList.includes(it.id)));
      checkPropertyList.value.push(item.id);
    }
    console.log(attrValue, '???');
    let skuList = [];
    if (attrValue.length == 0) {
      tableData.value = [];
      return;
    }
    // 处理添加一个属性的时候表格置空
    if (!attrValue[attrValue.length - 1].length) {
      return;
    }
    // 循环组成sku数据
    skuList = attrValue
      .reduce((pre, cur) => {
        let res = [];
        for (const item of pre) {
          for (const it of cur) {
            let t = item.name + ',' + it.name;
            res.push({
              name: t,
              url: item.url || it.url || '',
            });
          }
        }
        return res;
      })
      .map((it) => {
        const oldData = afterSku.value.find((item) => item.name == it.name);
        return {
          ...it,
          id: oldData ? oldData.id : '',
          price: oldData ? oldData.price : '',
          stock: oldData ? oldData.stock : '',
        };
      });
    tableData.value = skuList;
  };
  onMounted(() => {
    getAllAttrApi();
  });
</script>

<style lang="scss" scoped>
  .sku-row {
    width: 100%;
    margin-bottom: 10px;
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
