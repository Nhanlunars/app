import axios from 'axios'
//172.30.192.1
//const API_BASE_URL = "http://172.30.192.1:8080"; // ⚠️ thay đổi IP nếu đang dùng máy thật hoặc Android

export default axios.create({
  baseURL:'http://172.30.192.1:8080',
    withCredentials: true
})