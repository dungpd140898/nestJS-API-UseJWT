// user.model.ts
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String, // Lưu mật khẩu đã được hash
});

export interface User extends mongoose.Document {
  email: string;
  password: string;
}

export const UserModel = mongoose.model<User>('User', UserSchema);
