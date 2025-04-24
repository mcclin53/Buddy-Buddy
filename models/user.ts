import { Schema, DOcument, model, ObjectId } from 'mongoose';

interface IUser extends Document {
    _id: ObjectId;
    username: string;
    email: string;
    thoughts: [];
    friends: [];
}

const friendCountSchema = new Schema<IUser>({
    friendCount: Number,
})

function friendCount = friends.length