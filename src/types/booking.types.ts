import { User } from './user.types';
import { Space } from './space.types';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED'
}

export interface Booking {
  _id: string;
  user: User | string;
  space: Space | string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;
  notes?: string;
  checkInTime?: Date;
  checkOutTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingDto {
  spaceId: string;
  startDate: string;
  endDate: string;
  notes?: string;
}

export interface UpdateBookingDto {
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  notes?: string;
  checkInTime?: string;
  checkOutTime?: string;
}

export interface BookingAvailability {
  spaceId: string;
  date: string;
  availableSlots: {
    start: string;
    end: string;
  }[];
}
