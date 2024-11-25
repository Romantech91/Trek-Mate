export interface NPSAPIInfo {
  name: string;
  addresses: string[];
  description: string;
  lat: string;
  lng: string;
}

export interface NPSAPIPlace {
    id: string;
    parkInfo: NPSAPIInfo;
}
