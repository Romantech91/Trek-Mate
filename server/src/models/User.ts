import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';

// import schema from Place.js
import placeSchema from './Place.js';
import type { PlaceDocument } from './Place.js';

import type { ObjectId } from 'mongodb';

export interface UserDocument extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  savedPlaces: PlaceDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
  placeCount: number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedPlaces to be an array of data that adheres to the placeSchema
    savedPlaces: [placeSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// create a virtual called `id` that's value is the string version of the user's _id field
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `PlaceCount` with the number of saved places we have
userSchema.virtual('placeCount').get(function () {
  return this.savedPlaces.length;
});

const User = model<UserDocument>('User', userSchema);

export default User;
