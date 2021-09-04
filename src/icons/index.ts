import { App } from 'vue';
import SvgIcon from '@/components/SvgIcon/Index.vue';

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext: ReturnType<typeof require.context>) =>
  requireContext.keys().map(requireContext);
requireAll(req);

export default (app: App): void => {
  app.component('svg-icon', SvgIcon);
};
