import { appName } from '@/constants';
import { replaceFirstUpperCase } from './str';

export const setTitle = (title: string): void => {
  title = title ? `${replaceFirstUpperCase(title)} - ${appName}` : appName;
  window.document.title = title;
};
