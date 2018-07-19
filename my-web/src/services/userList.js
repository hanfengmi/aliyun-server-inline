import request from '../utils/request';

export function queryUserList() {
  return request('/api/userList');
}
