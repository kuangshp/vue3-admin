import AppBreadcrumb from './app-breadcrumb';
import AppHeader from './app-header';
import AppSidebar from './app-sidebar';
import Framement from './framement';
import Demo from './demo';

const components: { [propsName: string]: any } = {
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  Framement,
  Demo,
};

const install = (Vue: any): void => {
  Object.keys(components).forEach((component) =>
    Vue.component(component, components[component]),
  );
};

const API = {
  install,
  ...components,
};

// auto install
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue);
}

export default API;
