export interface NPSAPIInfo {
  name: string;
  addresses: string[];
  description: string;
}

export interface NPSAPIPlace {
    id: string;
    parkInfo: NPSAPIInfo;
}
