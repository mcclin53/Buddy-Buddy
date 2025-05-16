import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtID })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
      const user= await User.findOneAndUpdate(
        { username: req.body.username},
        { $addToSet: { thoughts: thought._id } },
        { new: true }
        );
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }   
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );
    if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      await Thought.findOneAndUpdate({ _id: req.params.thoughtID });
      res.json(thought)
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }



  export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtID })
            .select('__v')

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      await Thought.findOneAndDelete({ _id: req.params.thoughtID });
      res.json({ message: 'Thought deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  export const addReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
    if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      await Thought.findOneAndUpdate({ _id: req.params.thoughtID });
      res.json(thought)
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  export const deleteReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
    if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought)
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }