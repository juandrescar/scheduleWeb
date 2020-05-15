import Axios from 'axios';
const baseUrl = 'http://localhost:9000';

async function request(url, method, data1){
  const response = await Axios({
    method: method,
    url: `${baseUrl}${url}`,
    responseType: 'json',
    data: data1 ? data1 : undefined
  })
  return response.data;
}

export function create(data) {
  return request('/api/tasks', 'POST', data)
}

export function read() {
  return request('/api/tasks', 'GET')
}

export function update(id, data) {
  return request(`/api/tasks/${id}`, 'PUT', data)
}

export function remove(id) {
  return request(`/api/tasks/${id}`, 'DELETE')
}