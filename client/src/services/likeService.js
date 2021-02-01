import axios from 'axios';

const likeService = {
  getLike: async (postID, token) => {
    let res = await axios.get(`/api/like/${postID}/${token}`);
    return res.data || [];
  }
};

export default likeService;
