import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入全局样式
import './assets/css/main.scss';

/******************************** 引入elementUi组件库 start ********************************/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
/******************************** 引入elementUi组件库 end   ********************************/

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
