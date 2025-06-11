import axios from "axios";

export const postApi = (path, data) => {
  return axios.post(path, data);
};
