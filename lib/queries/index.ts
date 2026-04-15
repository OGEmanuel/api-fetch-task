import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const QUERIES = {
  getUsers: async () => {
    return await axios.get(BASE_URL);
  },
  getUserDetails: async (id: number) => {
    return await axios.get(`${BASE_URL}/${id}`);
  },
};
