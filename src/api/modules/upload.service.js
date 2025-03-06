import { axiosInstance } from '@/utils';

export class UploadFileService {
  static async uploadApi(data) {
    return axiosInstance.request({
      url: '/uploadFile',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data
    });
  }
}
