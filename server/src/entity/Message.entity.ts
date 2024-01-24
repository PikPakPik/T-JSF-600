import { model, Schema, Document } from 'mongoose';

interface MessageDTO extends Document {
    user: Schema.Types.ObjectId,
    message: string,
    room: Schema.Types.ObjectId,
    createdAt: string,
}

const schema = new Schema<MessageDTO>({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    message: { type: String, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room'},
    createdAt: { type: String, default: new Date().toISOString() },
});

const Message = model<MessageDTO>('Message', schema, 'messages')

export default Message;