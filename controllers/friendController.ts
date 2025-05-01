import { User } from '../models/index.js';
import { Request, Response } from 'express';

export const addFriend = async (req: Request, res: Response) => {
    try {
        const friendId = req.params.friendID;
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const friend = await User.findById(friendId);
        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        user.friends.push(friendId);
        await user.save();

    } catch (error) {
        return res.status(500).json({ message: 'Error adding friend', error });
    }
};

export const removeFriend = async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.friends.pull(friendId);
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Error removing friend', error });
    }
};