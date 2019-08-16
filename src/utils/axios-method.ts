import axios from 'axios';

export const $get = (url: string): Promise<any> => {
  return axios.get(url);
};

export const $post = (
  url: string,
  postData: { [propsName: string]: any },
): Promise<any> => {
  return axios.post(url, postData);
};

export const $put = (
  url: string,
  postData: { [propsName: string]: any },
): Promise<any> => {
  return axios.put(url, postData);
};

export const $delete = (url: string): Promise<any> => {
  return axios.delete(url);
};
