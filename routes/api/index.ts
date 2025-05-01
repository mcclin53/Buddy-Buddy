import { Router } from 'express';
const router = Router();
import thoughtRoutes from './thoughtRoutes.js';
import userRoutes from './userRoutes.js';
import friendRoutes from '.friendRoutes.js';

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
router.user('/users/:userId/friends', friendRoutes)

export default router;
