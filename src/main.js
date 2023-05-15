import Vue from 'vue';
import App from './views/shared/app/Index.vue';
import { router } from './router';
import store from './store';
// 引入全局样式
import './assets/css/main.scss';

/******************************** 配置axios的请求 start ********************************/
import axios from 'axios';
import { axiosHttp } from './utils';
axiosHttp.init();
Vue.prototype.$axios = axios;
/******************************** 配置axios的请求 end   ********************************/

/******************************** 引入elementUi组件库 start ********************************/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
Vue.use(ElementUI, {
  size: 'small',
});
/******************************** 引入elementUi组件库 end   ********************************/

// 使用自己定义的组件
import components from '@/components';
Vue.use(components);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
