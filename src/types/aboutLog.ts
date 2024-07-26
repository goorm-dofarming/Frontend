export interface logDataType {
  logId: number;
  userId: number;
  theme: string;
  address: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  status: boolean;
}

export interface logTestDataType {
  createdAt: string;
  latitude: number;
  logId: number;
  longitude: number;
  theme: string;
}

export interface recommendsType {
  id: number;
  title: string;
  addr: string;
  dataType: number;
  tel: string;
  image: string;
  mapX: number;
  mapY: number;
}

export interface locationType {
  latitude: number;
  longitude: number;
}

export interface onSelectCityType {
  longitude: number;
  latitude: number;
}
