import axios from "axios";

const userService = {
  getAll: async () => {
    let res = await axios.get("/api/user");
    return res.data || [];
  },
  getByToken: async (token) => {
    let res = await axios.get(`/api/user/token/${token}`);
    return res.data || [];
  },
};

export default userService;
