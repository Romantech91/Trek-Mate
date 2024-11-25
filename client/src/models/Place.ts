interface Image {
  altText: string;
  caption: string;
  credit: string;
  crops: any[]; // Adjust this type based on what 'crops' actually holds
  title: string;
  url: string;
}


export interface Place {
  name: string;
  lat: number;
  lng: number;
  weatherOverview: string;
  directionsUrl: string;
  images: Image[];
  url: string;
}

