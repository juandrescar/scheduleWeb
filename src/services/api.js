import Axios from 'axios';

async function request(url, method, data1){
  const response = await Axios({
    method: method,
    url: `${process.env.REACT_APP_API_URL}${url}`,
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

export function toggleTask(id, data) {
  return request(`/api/tasks/${id}/status`, 'POST', data)
}

export function readSlack() {
  return request('/api/slacks', 'GET')
}