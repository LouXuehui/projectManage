import axios from 'axios';

export function getApprovalList() {
  return axios.post('api/project/GetApprovalList');
}

export function getApprovalById(payload) {
  return axios.post('api/project/GetApproval', payload);
}
