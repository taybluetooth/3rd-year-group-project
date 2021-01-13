import axios from 'axios';

const postService = {
  getAll: async () => {
    let res = await axios.get('/api/post');
    return res.data || [];
  }
};

export default postService;
