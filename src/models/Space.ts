import mongoose, { Schema, Model } from 'mongoose';
import { Space as ISpace, SpaceType } from '@/types/space.types';

export interface SpaceDocument extends Omit<ISpace, '_id'>, mongoose.Document {}

const SpaceSchema = new Schema<SpaceDocument>(
  {
    name: {
      type: String,
      required: [true, 'Nom de l\'espace est requis'],
      trim: true,
      minlength: [3, 'Le nom doit contenir au moins 3 caractères']
    },
    type: {
      type: String,
      enum: Object.values(SpaceType),
      required: [true, 'Type d\'espace est requis']
    },
    description: {
      type: String,
      required: [true, 'Description est requise'],
      minlength: [10, 'La description doit contenir au moins 10 caractères']
    },
    capacity: {
      type: Number,
      required: [true, 'Capacité est requise'],
      min: [1, 'La capacité doit être au moins 1']
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Prix par heure est requis'],
      min: [0, 'Le prix ne peut pas être négatif']
    },
    pricePerDay: {
      type: Number,
      required: [true, 'Prix par jour est requis'],
      min: [0, 'Le prix ne peut pas être négatif']
    },
    amenities: {
      type: [String],
      default: []
    },
    images: {
      type: [String],
      default: []
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    location: {
      type: String,
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

// Index pour recherche et filtrage
SpaceSchema.index({ type: 1, isAvailable: 1 });
SpaceSchema.index({ name: 'text', description: 'text' });

const SpaceModel: Model<SpaceDocument> =
  mongoose.models.Space || mongoose.model<SpaceDocument>('Space', SpaceSchema);

export default SpaceModel;
