import axios from "axios";
console.log();
const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

export default axiosClient;
