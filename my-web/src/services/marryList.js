import request from '../utils/request';

export function queryImageList() {
  return request('/api/img');
}

export function addImage(params){
  return request('/api/img/add', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
