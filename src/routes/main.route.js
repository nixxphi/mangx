import express from 'express';
import userRoutes from './user.route.js';
import storyRoutes from './story.route.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/stories', storyRoutes);

export default router;
