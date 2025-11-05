export enum UserRole {
  CLIENT = 'CLIENT',
  STAFF = 'STAFF',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN'
}

export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  name?: string;
  phone?: string;
  avatar?: string;
  isActive?: boolean;
}
