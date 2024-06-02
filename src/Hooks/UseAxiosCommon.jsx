import axios from "axios"

const axiosCommon = axios.create({
    baseURL: 'http://localhost:5000'
})
export default function UseAxiosCommon() {
  return axiosCommon;
}
