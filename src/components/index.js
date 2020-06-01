import Menus from './menus';

const components = {
  Menus,
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
