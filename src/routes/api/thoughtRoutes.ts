import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, deleteReaction, addReaction } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/')
      .get(getThoughts)
      .post(createThought);

// /api/thoughts/:thoughId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export default router;
