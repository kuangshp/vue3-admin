<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div class="modal" ref="modalRef" v-if="modelValue" tabindex="-1" @keyup.esc="onEsc">
        <div class="mask" @click="onClickMask"></div>
        <Transition name="modal-zoom">
          <div
            class="modal-content"
            :class="{ 'is-fullscreen': isFullscreen }"
            :style="contentStyles"
            ref="modalContent"
          >
            <div
              class="modal-header"
              :style="{ cursor: effectiveDraggable ? 'move' : 'default' }"
              @mousedown="startDrag"
            >
              <template v-if="isHeader">
                <slot name="title"></slot>
              </template>
              <template v-else>{{ title }}</template>
              <div class="header-actions">
                <el-icon
                  v-if="showFullscreenButton"
                  class="action-btn"
                  @click.stop="toggleFullscreen"
                >
                  <component :is="isFullscreen ? 'FullscreenExit' : 'FullScreen'" />
                </el-icon>
                <el-icon v-if="closeButton" class="close-btn action-btn" @click="close">
                  <CloseBold />
                </el-icon>
              </div>
            </div>
            <div class="modal-body" :style="bodyStyle">
              <slot></slot>
            </div>
            <div class="modal-footer" v-if="isFooter">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { computed, defineProps, nextTick, ref, watch, useSlots, onUnmounted } from 'vue';
  import { CloseBold } from '@element-plus/icons-vue';
  import type { CustomModalProps, CustomModalEmits, DragState, ContentPosition } from '../types';

  const isHeader = !!useSlots().title;
  const isFooter = !!useSlots().footer;

  // 定义emits
  const emit = defineEmits<CustomModalEmits>();

  // 定义props
  const props = withDefaults(defineProps<CustomModalProps>(), {
    modelValue: false,
    // 标题
    title: '',
    // 弹框宽度
    width: 600,
    // 弹框高度
    height: '', // 允许用户传入空，即不指定时自动适配
    // 是否显示头部x关闭按钮
    closeButton: true,
    // 点击遮罩层关闭
    closeOnClickMask: true,
    // 是否可以按esc关闭
    closeOnEsc: true,
    // 内容区域样式
    contentStyle: () => ({}),
    // 是否开始拖拽
    draggable: false,
    // 是否全屏
    fullscreen: false,
    // 内容样式
    bodyStyle: () => ({}),
    // 滚动条的高度
    scrollTop: 0,
  });

  const modalRef = ref<HTMLDivElement>();
  const modalContent = ref<HTMLDivElement | null>(null);

  // 新增状态管理
  const isFullscreen = ref<boolean>(props.fullscreen);
  const actualDraggable = ref<boolean>(props.draggable);

  // 拖拽相关状态
  const dragState = ref<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const contentPos = ref<ContentPosition>({ x: 0, y: 0 });

  // 动态计算拖拽能力
  const effectiveDraggable = computed<boolean>(() => {
    return actualDraggable.value && !isFullscreen.value;
  });

  const showFullscreenButton = computed<boolean>(() => {
    return !props.draggable || isFullscreen.value;
  });

  // 智能状态同步
  watch(
    () => props.fullscreen,
    (newVal: boolean) => {
      isFullscreen.value = newVal;
      if (newVal) actualDraggable.value = false;
    }
  );

  watch(
    () => props.draggable,
    (newVal: boolean) => {
      actualDraggable.value = newVal;
      if (newVal && isFullscreen.value) {
        console.warn('[Modal] 拖拽启用时自动退出全屏模式');
        isFullscreen.value = false;
      }
    }
  );

  // 监听打开的时候设置滚动条位置
  watch(
    () => props.modelValue,
    () => {
      if (props.modelValue) {
        isFullscreen.value = props.fullscreen;
        nextTick(() => {
          modalRef.value?.focus();
          // 设置滚动条默认位置
          if (modalContent.value) {
            const body = modalContent.value.querySelector('.modal-body') as HTMLElement;
            if (body) body.scrollTop = props.scrollTop;
          }
        });
      }
    }
  );

  const close = (): void => {
    isFullscreen.value = props.fullscreen;
    emit('update:modelValue', false);
    emit('close');
  };

  const onEsc = (): void => {
    console.log('onEsc', props.modelValue, props.closeOnEsc);
    if (props.modelValue && props.closeOnEsc) {
      close();
    }
  };

  const onClickMask = (): void => {
    if (props.closeOnClickMask) {
      close();
    }
  };

  // 合并样式
  const contentStyles = computed<Record<string, string | number>>(() => {
    const getWidth = (): string => {
      if (isFullscreen.value) return '100%';
      if (typeof props.width === 'number') {
        return `${props.width}px`;
      }
      // 自动补充单位
      const value = String(props.width).trim();
      if (/^\d+$/.test(value)) {
        return `${value}px`;
      }
      return value;
    };

    const getHeight = (): string => {
      if (isFullscreen.value) return '100%';
      if (!props.height) return 'auto';
      if (typeof props.height === 'number') {
        return `${props.height}px`;
      }
      const value = String(props.height).trim();
      if (/^\d+$/.test(value)) {
        return `${value}px`;
      }
      return value;
    };

    return {
      width: getWidth(),
      height: getHeight(),
      transform: `translate(${contentPos.value.x}px, ${contentPos.value.y}px)`,
      ...props.contentStyle,
    } as Record<string, string | number>;
  });

  // 全屏切换逻辑
  const toggleFullscreen = (): void => {
    if (actualDraggable.value) {
      console.warn('[Modal] 拖拽模式下不可全屏');
      return;
    }
    isFullscreen.value = !isFullscreen.value;
    // 退出全屏时重置位置
    if (!isFullscreen.value) {
      contentPos.value = { x: 0, y: 0 };
    }
    emit('fullscreen-change', isFullscreen.value);
  };

  // 拖拽处理逻辑
  const startDrag = (e: MouseEvent): void => {
    if (!effectiveDraggable.value || !modalContent.value) return;

    const rect = modalContent.value.getBoundingClientRect();
    dragState.value = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: contentPos.value.x,
      offsetY: contentPos.value.y,
      modalWidth: rect.width, // 保存模态框宽度
      modalHeight: rect.height, // 保存模态框高度
    };

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  const onDrag = (e: MouseEvent): void => {
    if (!dragState.value.isDragging || !dragState.value.modalWidth || !dragState.value.modalHeight)
      return;

    const deltaX = e.clientX - dragState.value.startX;
    const deltaY = e.clientY - dragState.value.startY;

    let newX = dragState.value.offsetX + deltaX;
    let newY = dragState.value.offsetY + deltaY;

    // 获取视口和模态框尺寸
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const modalWidth = dragState.value.modalWidth;
    const modalHeight = dragState.value.modalHeight;

    // 计算原始居中位置
    const originalLeft = (viewportWidth - modalWidth) / 2;
    const originalTop = (viewportHeight - modalHeight) / 2;

    // 计算新位置
    let newLeft = originalLeft + newX;
    let newTop = originalTop + newY;

    // 限制左边和右边
    if (newLeft < 0) {
      newX = -originalLeft;
    } else if (newLeft + modalWidth > viewportWidth) {
      newX = viewportWidth - modalWidth - originalLeft;
    }

    // 限制顶部和底部
    if (newTop < 0) {
      newY = -originalTop;
    } else if (newTop + modalHeight > viewportHeight) {
      newY = viewportHeight - modalHeight - originalTop;
    }

    contentPos.value = { x: newX, y: newY };
  };

  const stopDrag = (): void => {
    dragState.value.isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);

    // 二次边界检查
    if (!modalContent.value) return;

    const rect = modalContent.value.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let adjustedX = contentPos.value.x;
    let adjustedY = contentPos.value.y;

    if (rect.left < 0) {
      adjustedX += -rect.left;
    } else if (rect.right > viewportWidth) {
      adjustedX -= rect.right - viewportWidth;
    }

    if (rect.top < 0) {
      adjustedY += -rect.top;
    } else if (rect.bottom > viewportHeight) {
      adjustedY -= rect.bottom - viewportHeight;
    }

    contentPos.value = { x: adjustedX, y: adjustedY };
  };

  onUnmounted(() => {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  });
</script>

<style lang="scss" scoped>
  .modal,
  .mask {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1100;
  }

  .modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0;
    border: 0;
  }

  .mask {
    position: absolute;
    background: rgba(0, 0, 0, 0.25);
  }

  .modal-content {
    z-index: 1101;
    background: #fff;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition:
      transform 0.2s ease,
      width 0.3s ease,
      height 0.3s ease;
    position: relative;
    max-width: 95vw;
    max-height: 95vh;
    display: flex;
    flex-direction: column;

    &.is-fullscreen {
      width: 100% !important;
      height: 100vh !important;
      max-width: 100%;
      max-height: 100%;
      border-radius: 0;

      .modal-body {
        max-height: none !important;
        /* 全屏时移除高度限制 */
      }
    }

    .modal-header {
      width: 100%;
      height: 48px;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 500;
      color: #1d2129;
      line-height: 48px;
      border-bottom: 1px solid #e5e6eb;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;

      &.is-dragging {
        cursor: move;
      }

      .header-actions {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        gap: 12px;

        .action-btn {
          cursor: pointer;
          transition: opacity 0.2s;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }

    .modal-body {
      flex: 1;
      overflow-y: auto;
      max-height: 400px;
      padding: 20px;
      box-sizing: border-box;

      /* 滚动条样式（可选） */
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
      }
    }

    .modal-footer {
      border-top: 1px solid #e5e6eb;
      padding: 16px 20px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .modal-fade-enter-active {
    animation: modal-fade-enter 0.25s both ease-in;
  }

  .modal-fade-leave-active {
    animation: modal-fade-leave 0.25s both ease-out;
  }

  .modal-zoom-enter-active {
    animation: modal-zoom-enter 0.25s both cubic-bezier(0.4, 0, 0, 1.5);
  }

  .modal-zoom-leave-active {
    animation: modal-zoom-leave 0.25s both;
  }

  @keyframes modal-fade-enter {
    from {
      opacity: 0;
    }
  }

  @keyframes modal-fade-leave {
    to {
      opacity: 0;
    }
  }

  @keyframes modal-zoom-enter {
    from {
      transform: scale3d(0.3, 0.3, 0.3);
    }
  }

  @keyframes modal-zoom-leave {
    to {
      transform: scale3d(0.3, 0.3, 0.3);
    }
  }
</style>

