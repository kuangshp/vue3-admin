import axios from 'axios';
import { fileObjectField, serializeObject } from '@/utils';

export default class BaseService {
  // 提供get请求方法
  async get (url, params = {}) {
    return await axios.get(`${url}?${serializeObject(params)}`);
  }

  // 提供post请求
  async post (url, postData = {}) {
    return await axios.post(url, fileObjectField(postData));
  }

  // 提供put请求
  async put (url, id, postData = {}) {
    return await axios.put(`${url}/${id}`, fileObjectField(postData));
  }

  // 提供delete请求
  async delete (url, id) {
    return await axios.delete(`${url}/${id}`);
  }
}

