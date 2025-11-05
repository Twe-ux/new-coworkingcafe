import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { UserRole } from '@/types/user.types';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Redirection basée sur le rôle
  switch (session.user.role) {
    case UserRole.CLIENT:
      redirect('/dashboard/client');
    case UserRole.STAFF:
      redirect('/dashboard/staff');
    case UserRole.MANAGER:
      redirect('/dashboard/manager');
    case UserRole.ADMIN:
      redirect('/dashboard/admin');
    default:
      redirect('/login');
  }
}
