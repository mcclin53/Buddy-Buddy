import { Schema, Document, model, ObjectId, Types } from 'mongoose';

interface IReaction extends Document { 
    reactionID: ObjectId;
    reactionBody: String;
    username: String;
    createdAt: Date;
}

interface IThought extends Document {
    _id: ObjectId;
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
}

const reactionSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId(), },
        reactionID: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
        reactionBody: { type: String, required: true, maxlength: 280},
        username: { type: String, required: true },
        createdAt: {
            type: Date,
            default: Date.now, 
            get: (timestamp: string | number | Date) => new Date(timestamp).toLocaleString(),
            },
        },
    {
        toObject: { getters: true },
        toJSON: { getters: true },
    }
);


const thoughtSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId(), },
        thoughtText: {type: String, required: true, maxlength: 280},
        createdAt: {
            type: Date,
            default: Date.now, 
            get: (timestamp: string | number | Date) => new Date(timestamp).toLocaleString(),
            },
        username: {type: String, required: true},
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ],
    },
    {
        toObject: { getters: true },
        toJSON: { getters: true },
    }
);

const Reaction = model<IReaction>('Reaction', reactionSchema);
const Thought = model<IThought>('Thought', thoughtSchema);

export { Reaction, Thought }