import express from 'express';
import storyController from '../controllers/story.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   POST /stories
// @desc    Create a story
// @access  Private
router.post('/', authMiddleware, storyController.create);

// @route   GET /stories
// @desc    Get all stories
// @access  Public
router.get('/', storyController.getAll);

export default router;
