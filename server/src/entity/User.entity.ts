import { model, Schema } from 'mongoose';
import { UserDto } from '../dto/User.dto';

const schema = new Schema<UserDto>({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  createdAt: { type: String, default: new Date().toISOString() },
  updatedAt: { type: String, default: null },
  lastLogin: { type: String, default: null }
});

const User = model<UserDto>('User', schema, 'users')

export default User;