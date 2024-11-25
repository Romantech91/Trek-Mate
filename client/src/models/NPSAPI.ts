export interface NPSAPIInfo {
  name: string;
  addresses: string[];
  description: string;
  latitude: string;
  longitude: string;
  weatherOverview: string;
  directionsUrl: string;
}

export interface NPSAPIPlace {
    id: string;
    parkInfo: NPSAPIInfo;
}
