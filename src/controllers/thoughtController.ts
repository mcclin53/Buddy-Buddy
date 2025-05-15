import {User, Thought } from '../models/index.js';
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
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtID })
            .select('__v')

      if (!thought) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      await Thought.findOneAndDelete({ _id: req.params.thoughtID });
      res.json({ message: 'Thought deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }
