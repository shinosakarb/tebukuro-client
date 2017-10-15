import axios from 'axios'

export default axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 2000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
