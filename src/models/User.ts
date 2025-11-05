import mongoose, { Schema, Model } from 'mongoose';
import { User as IUser, UserRole } from '@/types/user.types';

export interface UserDocument extends Omit<IUser, '_id'>, mongoose.Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: [true, 'Email est requis'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide']
    },
    name: {
      type: String,
      required: [true, 'Nom est requis'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères']
    },
    password: {
      type: String,
      required: [true, 'Mot de passe est requis'],
      minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
      select: false // Ne pas retourner le password par défaut
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CLIENT
    },
    avatar: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    emailVerified: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        const { password, __v, ...rest } = ret;
        return rest;
      }
    }
  }
);

// Index pour recherche rapide
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(candidatePassword, this.password);
};

// Éviter la recréation du modèle en dev (hot reload)
const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
