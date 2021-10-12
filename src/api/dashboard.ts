import { httpGet } from 'utils/http';
import Mock from 'mockjs';

const obj = { aa: '11', bb: '22', cc: '33', dd: '44' };
export const registerMock = () => {
  // 使用正则
  Mock.mock(/dashboard\/get/, 'get', {
    code: 200,
    'data|5-10': [
      {
        'id|+1': 1,
        'name|5-8': /[a-zA-Z]/,
        cname: '@cname',
        'value|0-500': 20,
        image: Mock.Random.image(),
        birthday: '@date("yyyy-MM-dd")',
        city: '@city(true)', // 中国城市
        color: '@color', // 16进制颜色
        'isMale|1': true, // 布尔值
        'isFat|1-2': true, // true的概率是1/3
        'fromObj|2': obj, // 从obj对象中随机获取2个属性
        'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
        'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
        'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组
      }
    ]
  });
};

const api = {
  getTest() {
    return httpGet('/dashboard/get').then((res) => res.data);
  }
};

export default api;
