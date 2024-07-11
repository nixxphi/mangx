import StoryService from '../services/story.service.js';
import AIService from '../services/ai.service.js';
import { createHttpError, handleError, catchAsync } from '../utils/error.utils.js';

class StoryController {
  create = catchAsync(async (req, res) => {
    const story = await StoryService.create({ ...req.body, author: req.user.id });
    res.json(story);
  });

  getAll = catchAsync(async (req, res) => {
    const stories = await StoryService.getAll();
    res.json(stories);
  });

  transform = catchAsync(async (req, res) => {
    const { storyId } = req.params;
    const story = await StoryService.findById(storyId);

    if (!story) {
      throw createHttpError('STORY_NOT_FOUND', 'Story not found');
    }

    const transformedStory = await AIService.transformStory(story.content);
    res.json({ transformedStory });
  });

  getTransformed = catchAsync(async (req, res) => {
    const { storyId } = req.params;
    const transformedStory = await StoryService.getTransformed(storyId);

    if (!transformedStory) {
      throw createHttpError('STORY_NOT_FOUND', 'Transformed story not found');
    }

    res.json(transformedStory);
  });
}

export default new StoryController();
