import axios from 'axios';

const postService = {
  getAll: async () => {
    let res = await axios.get('/api/post');
    return res.data || [];
  },
  getUsersPosts: async (userID) => {
    let res = await axios.get(`/api/post/${userID}`);
    console.log(res.data);
    return res.data || [];
  }
};

export default postService;
