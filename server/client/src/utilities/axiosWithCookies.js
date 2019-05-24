import axios from "axios";

const axiosWithCookies = axios.create({
  withCredentials: true
});

export default axiosWithCookies;
