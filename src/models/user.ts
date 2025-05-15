import { Schema, Document, model, ObjectId } from 'mongoose';
import { isEmail } from 'validator'

interface IUser extends Document {
    _id: ObjectId;
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
    friendCount?: number;
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, validate: [isEmail, 'Please fill a valid email address']},
        thoughts: [{ type: ObjectId, ref: 'Thought' }],
        friends: [{ type: ObjectId, ref: 'User' }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function (this: IUser) {
        return this.friends.length;
    });

const User = model('user', userSchema);

export default User;