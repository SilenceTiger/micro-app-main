import { httpGet, httpPost, httpDelete, httpPatch } from 'utils/http';

const api = {
  getMenu() {
    return httpGet('http://localhost:8888/mock/config-center/menu').then((res) => res.data);
  },
  saveMenu(params: any) {
    return httpPost('http://localhost:8888/mock/config-center/menu', params).then((res) => res.data);
  },
  getApp(params?: any) {
    return httpGet('http://localhost:8888/mock/config-center/app', { params }).then((res) => res.data);
  },
  addApp(params: any) {
    return httpPost('http://localhost:8888/mock/config-center/app', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => res.data);
  },
  updateApp(params: any) {
    return httpPatch('http://localhost:8888/mock/config-center/app', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => res.data);
  },
  deleteApp(params: any) {
    return httpDelete('http://localhost:8888/mock/config-center/app', params).then((res) => res.data);
  }
};

export default api;
