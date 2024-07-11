import axios from 'axios';
import config from 'config';

const aiApiUrl = config.get('aiApiUrl');
const apiKey = config.get('aiApiKey');

class AIService {
  static async transformStory(story) {
    try {
      const response = await axios.post(`${aiApiUrl}/transform`, { story }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to transform story');
    }
  }
}

export default AIService;
