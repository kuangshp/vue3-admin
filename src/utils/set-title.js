import { appName } from '@/constants';
import { replaceFirstUpperCase } from './str';

export const setTitle = (title) => {
  title = title ? `${replaceFirstUpperCase(title)} - ${appName}` : appName;
  window.document.title = title;
};
