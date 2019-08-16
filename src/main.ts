import Vue from 'vue';
import App from './views/shared/app';
import router from './routers';
import store from './store';

Vue.config.productionTip = false;

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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
