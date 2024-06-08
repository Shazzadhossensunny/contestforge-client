import axios from "axios"

const axiosCommon = axios.create({
    baseURL: 'https://contestforge-server.vercel.app'
})
export default function UseAxiosCommon() {
  return axiosCommon;
}
