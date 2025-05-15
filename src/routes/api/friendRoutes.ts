const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.post('/users/:userId/friends/:friendId', friendController.addFriend);

router.delete('/users/:userId/friends/:friendId', friendController.removeFriend);


export default router;