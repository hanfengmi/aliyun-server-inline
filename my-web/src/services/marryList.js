import request from '../utils/request';
// all
export function queryImageList() {
  return request('/api/img');
}
// add
export function addImage(params){
  return request('/api/img/add', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// delete
export async function deleteImage(params) {
  return request(`/api/img/delete/${params.id}`);
}

// update
export async function updateImage(params) {
  return request('/api/img/update', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// details
export async function getImageDetail(params) {
  return request(`/api/img/details/${params.id}`);
}

