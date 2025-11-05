import { z } from 'zod';
import { UserRole } from '@/types/user.types';
import { SpaceType } from '@/types/space.types';
import { BlogStatus } from '@/types/blog.types';

// ============================================
// USER VALIDATIONS
// ============================================

export const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre'
    ),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// ============================================
// SPACE VALIDATIONS
// ============================================

export const createSpaceSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  type: z.nativeEnum(SpaceType),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  capacity: z.number().min(1, 'La capacité doit être au moins 1'),
  pricePerHour: z.number().min(0, 'Le prix par heure doit être positif'),
  pricePerDay: z.number().min(0, 'Le prix par jour doit être positif'),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  location: z.string().optional(),
});

export type CreateSpaceInput = z.infer<typeof createSpaceSchema>;

export const updateSpaceSchema = createSpaceSchema.partial();

export type UpdateSpaceInput = z.infer<typeof updateSpaceSchema>;

// ============================================
// BOOKING VALIDATIONS
// ============================================

export const createBookingSchema = z
  .object({
    spaceId: z.string().min(1, 'Espace requis'),
    startDate: z.string().datetime('Date de début invalide'),
    endDate: z.string().datetime('Date de fin invalide'),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end > start;
    },
    {
      message: 'La date de fin doit être après la date de début',
      path: ['endDate'],
    }
  )
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const now = new Date();
      return start >= now;
    },
    {
      message: 'La date de début doit être dans le futur',
      path: ['startDate'],
    }
  );

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export const updateBookingSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']).optional(),
  paymentStatus: z.enum(['PENDING', 'PAID', 'REFUNDED', 'FAILED']).optional(),
  notes: z.string().optional(),
  checkInTime: z.string().datetime().optional(),
  checkOutTime: z.string().datetime().optional(),
});

export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;

// ============================================
// BLOG VALIDATIONS
// ============================================

export const createBlogPostSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  excerpt: z.string().min(10, 'L\'extrait doit contenir au moins 10 caractères'),
  content: z.string().min(50, 'Le contenu doit contenir au moins 50 caractères'),
  coverImage: z.string().url('URL d\'image invalide'),
  category: z.string().min(1, 'Catégorie requise'),
  tags: z.array(z.string()),
  status: z.nativeEnum(BlogStatus),
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;

export const updateBlogPostSchema = createBlogPostSchema.partial();

export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;

// ============================================
// QUERY VALIDATIONS
// ============================================

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

export const searchSchema = paginationSchema.extend({
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export type SearchInput = z.infer<typeof searchSchema>;
