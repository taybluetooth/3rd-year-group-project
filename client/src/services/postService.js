import axios from "axios";

const postService = {
  getAll: async () => {
    let res = await axios.get("/api/post");
    return res.data || [];
  },
  getById: async (id) => {
    let res = await axios.get(`/api/post/${id}`);
    return res.data || [];
  },
  getUsersPosts: async (userID) => {
    let res = await axios.get(`/api/post/${userID}`);
    console.log(res.data);
    return res.data || [];
  },
  getFeed: async (userID) => {
    let res = await axios.get(`/api/feed/${userID}`);
    console.log(res.data);
    return res.data || [];
  },
  getAttendingEvents: async (userID) => {
    let res = await axios.get(`/api/attending-events/${userID}`);
    console.log(res.data);
    return res.data || [];
  },
};

export default postService;
