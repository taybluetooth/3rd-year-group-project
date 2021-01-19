import axios from "axios";

const userService = {
  getAll: async () => {
    let res = await axios.get("/api/user");
    return res.data || [];
  },
};

export default userService;
