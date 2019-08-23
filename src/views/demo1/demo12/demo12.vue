<template>
  <div class="demo12">
    <h1>我是demo12页面</h1>
    <el-button
      type="primary"
      @click="vuexGetUser"
    >使用vuex方法获取全部用户</el-button>
    <el-button
      type="primary"
      @click="getUser"
    >直接获取全部用户</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import axios from 'axios';
@Component({
  components: {},
})
export default class Demo12 extends Vue {
  @Action('user/getAllUserApi') private getAllUserApi!: () => Promise<any>;

  /**
   * 直接在vue组件中使用axios请求接口
   */
  private async getUser() {
    const { code, message, result } = await axios.get('/user?pageSize=10&pageNumber=1');
    console.log(code, message, result);
  }

  /**
   * 通过store统一调用接口
   */
  private async vuexGetUser() {
    const result = await this.getAllUserApi();
    console.log(result);
  }
}
</script>
<style lang="less">
</style>