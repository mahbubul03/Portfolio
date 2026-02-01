import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getProjects = async () => {
  const response = await api.get('/projects/')
  return response.data
}

export const getSkills = async () => {
  const response = await api.get('/skills/')
  return response.data
}

export const sendContactMessage = async (messageData) => {
  const response = await api.post('/contact/', messageData)
  return response.data
}

export const getExperience = async () => {
  const response = await api.get('/experience/')
  return response.data
}

export default api

