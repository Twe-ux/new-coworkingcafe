import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Sidebar from '@/components/dashboard/Sidebar';

export const metadata = {
  title: "Dashboard - Coworking Café",
  description: "Tableau de bord de gestion Coworking Café",
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="dashboard__layout">
      <Sidebar
        userRole={session.user.role}
        userName={session.user.name}
      />
      <main className="dashboard__main">
        {children}
      </main>
    </div>
  );
}
