import {model, Schema, Document, Types} from 'mongoose';

interface PrivateMessageDTO extends Document {
    fromUser: Types.ObjectId,
    toUser: Types.ObjectId,
    message: string,
    createdAt: string,
}

const schema = new Schema<PrivateMessageDTO>({
    fromUser: { type: Schema.Types.ObjectId, ref: 'User'},
    toUser: { type: Schema.Types.ObjectId, ref: 'User'},
    message: { type: String },
    createdAt: { type: String, default: new Date().toISOString() },
});

const PrivateMessage = model<PrivateMessageDTO>('PrivateMessage', schema, 'private_messages')

export default PrivateMessage;