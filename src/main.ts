import Vue from 'vue';
import axios from 'axios';
import App from './views/shared/app';
import { router } from './routers';
import store from './store';
import { axiosRequest } from './utils';

Vue.config.productionTip = false;

// 初始化请求的封装函数
axiosRequest.init();

// 配置element-ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 使用自己定义的组件
import components from '@/components';
Vue.use(components);

/********************************引入字体 start********************************/
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

fontawesome.library.add(solid);
fontawesome.library.add(regular);
fontawesome.library.add(brands);
Vue.component('font-awesome-icon', FontAwesomeIcon);
/********************************引入字体 end********************************/

(window as any)._vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
