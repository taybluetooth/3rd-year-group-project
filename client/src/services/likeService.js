import axios from 'axios';

const likeService = {
  getLike: async (postID) => {
    let res = await axios.get(`/api/like/${postID}`);
    return res.data || [];
  }
};

export default likeService;
