import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, deleteUser, addFriend, removeFriend, updateUser } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

export default router;
