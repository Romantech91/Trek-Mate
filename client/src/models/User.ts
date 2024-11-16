import type { Place } from './Place';

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedPlaces: Place[];
}
