/* eslint-disable no-invalid-this */
import { model, Schema, Model } from 'mongoose';
import { IUser } from './user.interface';
import {
  BadRequestException,
  NotFoundException,
} from 'expressjs-errors-handler';
import * as bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.pre<IUser>('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const saltRounds = 8;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

UserSchema.method('toJSON', function toJSON() {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  return {
    email: user.email,
    user_id: user._id,
  };
});

UserSchema.static(
  'checkCredential',
  async function checkCredential(email, password) {
    const user: IUser = await this.findOne({ email });
    if (!user) {
      throw new BadRequestException({
        message: 'email or password is incorrect',
        code: 'INVALID_EMAIL_OR_PASSWORD',
      });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new BadRequestException({
        message: 'email or password is incorrect',
        code: 'INVALID_EMAIL_OR_PASSWORD',
      });
    }
    return user.toJSON();
  },
);

UserSchema.static('findByEmail', async function findByEmail(email) {
  const user: IUser = await this.findOne({ email });
  if (!user) {
    throw new NotFoundException([
      {
        message: `this account doesn't exist`,
        code: 'NOT_FOUND',
      },
    ]);
  }
  return user;
});

const User = model('User', UserSchema) as Model<IUser>;
export default User;
