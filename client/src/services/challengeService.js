import axios from 'axios';

const challengeService = {
  getAll: async () => {
    let res = await axios.get('/api/challenge');
    return res.data || [];
  }
};

export default challengeService;
