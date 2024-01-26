import { model, Schema, Document } from 'mongoose';

interface RoomDTO extends Document {
  name: string,
  isDefault: boolean,
  createdBy: Schema.Types.ObjectId | null,
  createdAt: string,
}

const schema = new Schema<RoomDTO>({
  name: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, default: null, ref: 'User'},
  createdAt: { type: String, default: new Date().toISOString() },
});

const Room = model<RoomDTO>('Room', schema, 'rooms')

export default Room;