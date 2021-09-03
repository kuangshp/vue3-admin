<template>
  <div>
    <h1 @click="sayHi">Dashboard page</h1>
  </div>
</template>

<script>
import { getCurrentInstance, defineComponent } from 'vue';
export default defineComponent({
  name: 'Dashboard',
  setup() {
    const { proxy } = getCurrentInstance();
    const sayHi = () => {
      console.log('你好');
      proxy.$message.error('错误了');
    };
    return {
      sayHi,
    };
  },
});
</script>
