import { createApp, reactive } from 'vue';
import myLoad from './src/index.vue';

interface LoadingMessage {
  show: boolean;
  title: string;
}

const msg: LoadingMessage = reactive({
  show: false,
  title: '数据加载中......',
});

const $loading = createApp(myLoad, { msg }).mount(document.createElement('div'));

export const load = {
  show(title: string = msg.title): void {
    // 控制显示loading的方法
    msg.show = true;
    msg.title = title;
    document.body.appendChild($loading.$el);
  },

  hide(): void {
    // 控制loading隐藏的方法
    msg.show = false;
  },
};

export default load;
