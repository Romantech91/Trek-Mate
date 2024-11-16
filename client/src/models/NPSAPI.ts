export interface NPSAPIInfo {
  latitude: string;
  longitude: string;
  parkCode: string;
  name: string;
  description: string;
}

export interface NPSAPIPlace {
    id: string;
    parkInfo: NPSAPIInfo;
}
