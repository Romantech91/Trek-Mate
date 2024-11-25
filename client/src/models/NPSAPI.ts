
interface Image {
  altText: string;
  caption: string;
  credit: string;
  crops: any[]; // Adjust this type based on what 'crops' actually holds
  title: string;
  url: string;
}

export interface NPSAPIInfo {
  name: string;
  addresses: string[];
  description: string;
  latitude: string;
  longitude: string;
  weatherOverview: string;
  directionsUrl: string;
  url: string;
  images: Image[];
}

export interface NPSAPIPlace {
    id: string;
    parkInfo: NPSAPIInfo;
}
