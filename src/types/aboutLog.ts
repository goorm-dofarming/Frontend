export interface logDataType {
  logId: number;
  userId: number;
  theme: string;
  address: string;
  latitude: string;
  longitude: string;
  createAt: string;
  status: boolean;
}

export interface logTestDataType {
  address: string;
  createAt: string;
  recommends: recommendsType[];
  theme: string;
}

interface recommendsType {
  address: string;
  id: number;
  location: string;
  latitude: number;
  longitude: number;
  sorts: string;
  storeName: string;
  phone: string;
}

export interface locationType {
  latitude: number;
  longitude: number;
}
