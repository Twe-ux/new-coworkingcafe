import mongoose, { Schema, Model } from 'mongoose';
import { BlogPost as IBlogPost, BlogStatus } from '@/types/blog.types';
import { slugify } from '@/lib/utils';

export interface BlogPostDocument extends Omit<IBlogPost, '_id'>, mongoose.Document {}

const BlogPostSchema = new Schema<BlogPostDocument>(
  {
    title: {
      type: String,
      required: [true, 'Titre est requis'],
      trim: true,
      minlength: [3, 'Le titre doit contenir au moins 3 caractères']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    excerpt: {
      type: String,
      required: [true, 'Extrait est requis'],
      minlength: [10, 'L\'extrait doit contenir au moins 10 caractères']
    },
    content: {
      type: String,
      required: [true, 'Contenu est requis'],
      minlength: [50, 'Le contenu doit contenir au moins 50 caractères']
    },
    coverImage: {
      type: String,
      required: [true, 'Image de couverture est requise']
    },
    author: {
      name: {
        type: String,
        required: [true, 'Nom de l\'auteur est requis']
      },
      avatar: {
        type: String,
        default: null
      },
      id: {
        type: String,
        default: null
      }
    },
    category: {
      type: String,
      required: [true, 'Catégorie est requise'],
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: Object.values(BlogStatus),
      default: BlogStatus.DRAFT
    },
    publishedAt: {
      type: Date,
      default: null
    },
    views: {
      type: Number,
      default: 0,
      min: 0
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
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ status: 1, publishedAt: -1 });
BlogPostSchema.index({ category: 1, status: 1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ title: 'text', content: 'text' });

// Générer le slug avant la sauvegarde
BlogPostSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title);
  }

  // Mettre à jour publishedAt lors de la publication
  if (this.isModified('status') && this.status === BlogStatus.PUBLISHED && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

// Méthode pour incrémenter les vues
BlogPostSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

const BlogPostModel: Model<BlogPostDocument> =
  mongoose.models.BlogPost || mongoose.model<BlogPostDocument>('BlogPost', BlogPostSchema);

export default BlogPostModel;
