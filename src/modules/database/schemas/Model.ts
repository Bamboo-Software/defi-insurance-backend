import { Document, ObjectId } from 'mongoose';

export class Model extends Document {
  id: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;

  toDto(opts?: any): any {
    return this.toJSON({
      getters: true,
      virtuals: true,
      ...opts,
    });
  }
}
