import { Schema, type Document } from 'mongoose';

export interface PlaceDocument extends Document {
  placeId: string;
  name: string;
  savedPlaces: string[];
}

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedPlaces` array in User.js
const placeSchema = new Schema<PlaceDocument>({
  savedPlaces: [
    {
      type: String,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  // saved book id from maps API
  placeId: {
    type: String,
    required: true,
  },
});

export default placeSchema;
