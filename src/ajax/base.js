import axios from 'axios'

export default function create(config) {
  return axios.create(config)
}
