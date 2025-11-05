import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from './db';
import User from '@/models/User';
import { UserRole, UserSession } from '@/types/user.types';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email et mot de passe requis');
        }

        await connectDB();

        // Récupérer l'utilisateur avec le password
        const user = await User.findOne({ email: credentials.email }).select('+password');

        if (!user) {
          throw new Error('Email ou mot de passe incorrect');
        }

        if (!user.isActive) {
          throw new Error('Compte désactivé');
        }

        // Vérifier le mot de passe
        const isPasswordValid = await user.comparePassword(credentials.password);

        if (!isPasswordValid) {
          throw new Error('Email ou mot de passe incorrect');
        }

        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          role: user.role as UserRole,
          avatar: user.avatar || undefined
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.avatar = (user as any).avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).avatar = token.avatar;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

// Helper pour vérifier les rôles
export function hasRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole);
}

// Helper pour vérifier si admin
export function isAdmin(userRole: UserRole): boolean {
  return userRole === UserRole.ADMIN;
}

// Helper pour vérifier si staff ou plus
export function isStaffOrAbove(userRole: UserRole): boolean {
  return [UserRole.STAFF, UserRole.MANAGER, UserRole.ADMIN].includes(userRole);
}

// Helper pour vérifier si manager ou admin
export function isManagerOrAbove(userRole: UserRole): boolean {
  return [UserRole.MANAGER, UserRole.ADMIN].includes(userRole);
}
