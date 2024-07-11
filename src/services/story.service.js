import Story from '../models/story.model.js';
import GenericService from './generic.service.js';

const StoryService = GenericService(Story);

export default StoryService;
