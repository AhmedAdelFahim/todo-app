/* eslint-disable no-invalid-this */
import { model, Schema, Model } from 'mongoose';
import { IToDo } from './todo.interface';

const TodoSchema: Schema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    is_finished: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const User = model('Todo', TodoSchema) as Model<IToDo>;
export default User;
