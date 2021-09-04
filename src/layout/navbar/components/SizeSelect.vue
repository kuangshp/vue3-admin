<template>
  <div>
    <el-dropdown trigger="click" @command="handleSize">
      <div>
        <svg-icon class-name="size-icon" icon-class="size"></svg-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in sizeOptions"
            :key="item.value"
            :command="item.value"
            :disabled="item.value === size"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Size } from '@/plugins/element';
import {
  defineComponent,
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
  ComponentPublicInstance,
  computed,
  nextTick,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';

export default defineComponent({
  name: 'SizeSelect',
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    // store中获取size 这里需要注意通过computed获取store状态 确保获取到正确更新
    const size = computed(() => store.getters.size);
    // element size 选项
    const sizeOptions = ref([
      { label: 'Default', value: 'default' },
      { label: 'Medium', value: 'medium' },
      { label: 'Small', value: 'small' },
      { label: 'Mini', value: 'mini' },
    ]);

    // 刷新当前路由
    const refreshView = () => {
      const { fullPath } = route;
      nextTick(() => {
        // 重定向到中间页 实现vue中当前路由刷新
        router.replace({
          path: '/redirect' + fullPath,
        });
      });
    };

    // command 获取点击按钮的command属性值 作为size值
    const handleSize = (command: Size) => {
      // 修改element-plus组件尺寸
      (proxy as ComponentPublicInstance).$ELEMENT.size = command;
      // 更新store
      store.dispatch('app/setSize', command);
      // 切换size需要刷新路由才能生效
      refreshView();
      proxy?.$message.success({
        type: 'success',
        message: 'Switch Size Success',
      });
    };

    return {
      sizeOptions,
      size,
      handleSize,
    };
  },
});
</script>

<style lang="scss">
.size-icon {
  font-size: 18px;
}
</style>
