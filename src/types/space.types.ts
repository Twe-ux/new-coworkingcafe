export enum SpaceType {
  DESK = 'DESK',
  MEETING_ROOM = 'MEETING_ROOM',
  PRIVATE_OFFICE = 'PRIVATE_OFFICE',
  EVENT_SPACE = 'EVENT_SPACE'
}

export interface Space {
  _id: string;
  name: string;
  type: SpaceType;
  description: string;
  capacity: number;
  pricePerHour: number;
  pricePerDay: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSpaceDto {
  name: string;
  type: SpaceType;
  description: string;
  capacity: number;
  pricePerHour: number;
  pricePerDay: number;
  amenities?: string[];
  images?: string[];
  location?: string;
}

export interface UpdateSpaceDto {
  name?: string;
  type?: SpaceType;
  description?: string;
  capacity?: number;
  pricePerHour?: number;
  pricePerDay?: number;
  amenities?: string[];
  images?: string[];
  isAvailable?: boolean;
  location?: string;
}
