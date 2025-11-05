'use client';

import { useState } from 'react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="dashboard__header">
      <div className="header__left">
        <button
          className="mobile__menu__toggle d-lg-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className="bi bi-list"></i>
        </button>
        <div>
          <h1 className="header__title">{title}</h1>
          {subtitle && <p className="header__subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="header__right">
        <button className="header__notification">
          <i className="bi bi-bell"></i>
          <span className="notification__badge">3</span>
        </button>
      </div>
    </header>
  );
}
