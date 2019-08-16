import Vue from 'vue';
import App from './views/shared/app';
import router from './routers';
import store from './store';
// 配置element-ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 使用自己定义的组件
import components from '@/components';
Vue.use(components);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
