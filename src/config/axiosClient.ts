import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

export default axiosClient;
