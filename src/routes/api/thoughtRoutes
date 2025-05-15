import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, deleteThought } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:thoughtId').get(getSingleThought);

router.route('/:thoughtId').delete(deleteThought)

export default router;
