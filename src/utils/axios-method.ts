import axios from 'axios';
import Qs from 'qs';

export const $get = (url: string): Promise<any> => {
  return axios.get(url);
};

export const $post = (
  url: string,
  postData: { [propsName: string]: any },
): Promise<any> => {
  return axios({
    method: 'post',
    url,
    data: Qs.stringify(postData),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });
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
