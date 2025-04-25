import { Schema, Document, model, ObjectId } from 'mongoose';

interface IReaction extends Document {
    reactionID: ObjectId;
    reactionBody: String;
    username: String;
    createdAt: String;
}

interface IThought extends Document {
    _id: ObjectId;
    thoughtText: string;
    createdAt: string;
    username: string;
    reactions: IReaction[];
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionID: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
        reactionBody: { type: String, required: true, maxlength: 280},
        username: { type: String, required: true },
        createdAt: {
            type: Date,
            default: Date.now, 
            get: function (timestamp) {
                return new Date(timestamp).toLocaleString();
            }
        },
    }
);

reactionSchema.set('toObject', { getters: true });
reactionSchema.set('toJSON', { getters: true });

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {type: String, required: true, maxlength: 280},
        createdAt: {
            type: Date,
            default: Date.now, 
            get: function (timestamp) {
                return new Date(timestamp).toLocaleString();
            }
        },
        username: {type: String, required: true},
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ],
    }
);

thoughtSchema.set('toObject', { getters: true });
thoughtSchema.set('toJSON', { getters: true });

const Reaction = model<IReaction>('Reaction', reactionSchema);
const Thought = model<IThought>('Thought', thoughtSchema);