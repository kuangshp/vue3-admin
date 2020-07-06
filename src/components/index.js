import Menus from './menus';
import tablePagination from './table-pagination/Index.vue';

const components = {
  Menus,
  tablePagination,
};

const install = (Vue) => {
  Object.keys(components).forEach((component) =>
    Vue.component(component, components[component]),
  );
};

const API = {
  install,
  ...components,
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default API;
