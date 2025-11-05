export enum BlogStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
    id?: string;
  };
  category: string;
  tags: string[];
  status: BlogStatus;
  publishedAt?: Date;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBlogPostDto {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: BlogStatus;
}

export interface UpdateBlogPostDto {
  title?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  status?: BlogStatus;
  publishedAt?: Date;
}
