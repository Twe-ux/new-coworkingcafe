import mongoose, { Schema, Model } from 'mongoose';
import { Booking as IBooking, BookingStatus, PaymentStatus } from '@/types/booking.types';

export interface BookingDocument extends Omit<IBooking, '_id'>, mongoose.Document {}

const BookingSchema = new Schema<BookingDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Utilisateur est requis']
    },
    space: {
      type: Schema.Types.ObjectId,
      ref: 'Space',
      required: [true, 'Espace est requis']
    },
    startDate: {
      type: Date,
      required: [true, 'Date de début est requise']
    },
    endDate: {
      type: Date,
      required: [true, 'Date de fin est requise'],
      validate: {
        validator: function(this: BookingDocument, value: Date) {
          return value > this.startDate;
        },
        message: 'La date de fin doit être après la date de début'
      }
    },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING
    },
    totalPrice: {
      type: Number,
      required: [true, 'Prix total est requis'],
      min: [0, 'Le prix ne peut pas être négatif']
    },
    notes: {
      type: String,
      default: null
    },
    checkInTime: {
      type: Date,
      default: null
    },
    checkOutTime: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        const { __v, ...rest } = ret;
        return rest;
      }
    }
  }
);

// Index pour recherche et performance
BookingSchema.index({ user: 1, status: 1 });
BookingSchema.index({ space: 1, startDate: 1, endDate: 1 });
BookingSchema.index({ status: 1, paymentStatus: 1 });
BookingSchema.index({ startDate: 1, endDate: 1 });

// Méthode statique pour vérifier les conflits de réservation
BookingSchema.statics.checkAvailability = async function(
  spaceId: string,
  startDate: Date,
  endDate: Date,
  excludeBookingId?: string
) {
  const query: any = {
    space: spaceId,
    status: { $nin: [BookingStatus.CANCELLED] },
    $or: [
      // Nouvelle réservation commence pendant une réservation existante
      { startDate: { $lte: startDate }, endDate: { $gt: startDate } },
      // Nouvelle réservation se termine pendant une réservation existante
      { startDate: { $lt: endDate }, endDate: { $gte: endDate } },
      // Nouvelle réservation englobe une réservation existante
      { startDate: { $gte: startDate }, endDate: { $lte: endDate } }
    ]
  };

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  const conflictingBooking = await this.findOne(query);
  return !conflictingBooking;
};

const BookingModel: Model<BookingDocument> =
  mongoose.models.Booking || mongoose.model<BookingDocument>('Booking', BookingSchema);

export default BookingModel;
