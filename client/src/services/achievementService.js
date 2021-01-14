import axios from 'axios';

const achievementService = {
  getAll: async () => {
    let res = await axios.get('/api/achievement');
    return res.data || [];
  }
};

export default achievementService;
