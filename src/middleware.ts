import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { UserRole } from './types/user.types';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Redirection si non authentifié
    if (!token && path.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Vérifier les rôles pour les routes protégées
    if (token) {
      const userRole = token.role as UserRole;

      // Routes admin uniquement
      if (path.startsWith('/dashboard/admin') && userRole !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      // Routes manager et admin
      if (
        path.startsWith('/dashboard/manager') &&
        ![UserRole.MANAGER, UserRole.ADMIN].includes(userRole)
      ) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      // Routes staff, manager et admin
      if (
        path.startsWith('/dashboard/staff') &&
        ![UserRole.STAFF, UserRole.MANAGER, UserRole.ADMIN].includes(userRole)
      ) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permettre l'accès aux routes publiques
        if (
          req.nextUrl.pathname.startsWith('/auth') ||
          req.nextUrl.pathname.startsWith('/api/auth')
        ) {
          return true;
        }

        // Exiger l'authentification pour /dashboard
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token;
        }

        return true;
      }
    }
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/api/dashboard/:path*']
};
