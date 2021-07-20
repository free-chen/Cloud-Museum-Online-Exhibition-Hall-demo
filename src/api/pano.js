import request from '@/utils/request';
import Qs from 'qs';

export const fetchScenes = () => {
  return request.get(`/panoDatas`);
};
