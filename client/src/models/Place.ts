export interface Place {
  name: string;
  placeId: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  }
  image: string;
}
