import { Document, Schema } from 'mongoose';

export interface IToDo extends Document {
  user_id: Schema.Types.ObjectId;
  title: string;
  description: string;
  is_finished: boolean;
}
