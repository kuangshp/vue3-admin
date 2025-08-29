import axios, { type ApiResponse } from '@/utils/httpRequest';

export class UploadFileService {
  static async uploadApi(data: FormData): Promise<ApiResponse> {
    return axios.request({
      url: '/uploadFile',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
  }
}
