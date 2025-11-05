'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { UserRole } from '@/types/user.types';

interface SidebarProps {
  userRole: UserRole;
  userName: string;
}

interface MenuItem {
  label: string;
  href: string;
  icon: string;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Tableau de bord',
    href: '/dashboard',
    icon: '📊',
    roles: [UserRole.CLIENT, UserRole.STAFF, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    label: 'Mes réservations',
    href: '/dashboard/client/bookings',
    icon: '📅',
    roles: [UserRole.CLIENT]
  },
  {
    label: 'Nouvelle réservation',
    href: '/dashboard/client/new-booking',
    icon: '➕',
    roles: [UserRole.CLIENT]
  },
  {
    label: 'Mon profil',
    href: '/dashboard/client/profile',
    icon: '👤',
    roles: [UserRole.CLIENT]
  },
  {
    label: 'Réservations du jour',
    href: '/dashboard/staff/today',
    icon: '📋',
    roles: [UserRole.STAFF, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    label: 'Check-in / Check-out',
    href: '/dashboard/staff/checkin',
    icon: '✅',
    roles: [UserRole.STAFF, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    label: 'Analytics',
    href: '/dashboard/manager/analytics',
    icon: '📈',
    roles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    label: 'Gestion espaces',
    href: '/dashboard/manager/spaces',
    icon: '🏢',
    roles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    label: 'Blog CMS',
    href: '/dashboard/manager/blog',
    icon: '✍️',
    roles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    label: 'Utilisateurs',
    href: '/dashboard/admin/users',
    icon: '👥',
    roles: [UserRole.ADMIN]
  },
  {
    label: 'Configuration',
    href: '/dashboard/admin/settings',
    icon: '⚙️',
    roles: [UserRole.ADMIN]
  }
];

export default function Sidebar({ userRole, userName }: SidebarProps) {
  const pathname = usePathname();

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(userRole)
  );

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <aside className="dashboard__sidebar">
      <div className="sidebar__header">
        <Link href="/" className="sidebar__logo">
          <img src="/images/logo.svg" alt="logo" />
          <h5>Coworking Café</h5>
        </Link>
      </div>

      <div className="sidebar__user">
        <div className="user__avatar">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="user__info">
          <h6>{userName}</h6>
          <span className="user__role">{userRole}</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <ul>
          {filteredMenuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? 'active' : ''}
              >
                <span className="nav__icon">{item.icon}</span>
                <span className="nav__label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <button onClick={handleLogout} className="logout__btn">
          <span className="nav__icon">🚪</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
