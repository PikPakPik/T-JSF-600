import { model, Schema, Document } from 'mongoose';

interface PrivateMessageDTO extends Document {
    fromUser: Schema.Types.ObjectId,
    toUser: Schema.Types.ObjectId,
    message: string,
    createdAt: string,
}

const schema = new Schema<PrivateMessageDTO>({
    fromUser: { type: Schema.Types.ObjectId, ref: 'User'},
    toUser: { type: Schema.Types.ObjectId, ref: 'User'},
    message: { type: String, required: true },
    createdAt: { type: String, default: new Date().toISOString() },
});

const PrivateMessage = model<PrivateMessageDTO>('PrivateMessage', schema, 'private_messages')

export default PrivateMessage;