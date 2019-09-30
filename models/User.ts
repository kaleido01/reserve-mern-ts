import mongoose from 'mongoose'

export interface UserType extends mongoose.Document {
  name: string
  email: string
  password: string
  role: string
}
const UserSchema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin', 'root'],
    },
  },
  {
    timestamps: true,
  },
)

export default (mongoose.models.User as mongoose.Model<UserType, {}>) ||
  mongoose.model<UserType>('User', UserSchema)
