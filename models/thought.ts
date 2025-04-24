import { Schema, Document, model, ObjectId } from 'mongoose';

interface IThought extends Document {
    _id: ObjectId;
    thoughtText: string;
    createdAt: string;
    username: string;
    reactions: IReaction[];
}

interface IReaction extends Document {
    reaction: String;
}
 const reactionSchema = new Schema<IReaction>
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {type: String, required: true, },
        createdAt: {type: Date, },
        username: {type: String, required: true},
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reactions'
            }
        ],
    }