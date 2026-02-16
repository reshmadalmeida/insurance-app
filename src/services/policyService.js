import api from './apiClient';

export const policyService = {
  list: (params = {}) => api.get('/policies', { params }).then(r => r.data),
  create: (payload) => api.post('/policies', payload).then(r => r.data)
};