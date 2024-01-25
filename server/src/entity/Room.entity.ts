import { model, Schema, Document } from 'mongoose';

interface RoomDTO extends Document {
  name: string,
  slug: string,
  isDefault: boolean,
  createdAt: string,
}

const schema = new Schema<RoomDTO>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  isDefault: { type: Boolean, default: false, index: { unique: true } },
  createdAt: { type: String, default: new Date().toISOString() },
});

const Room = model<RoomDTO>('Room', schema, 'rooms')

export default Room;