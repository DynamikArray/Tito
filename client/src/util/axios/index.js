import axios from "axios";

const config = {
  baseURL: "/v1/",
  timeout: 30000
};

const clientAxios = axios.create({ ...config });

export default clientAxios;
