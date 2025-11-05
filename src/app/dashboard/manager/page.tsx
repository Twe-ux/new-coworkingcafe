import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default async function ManagerDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <DashboardHeader
        title="Dashboard Manager"
        subtitle="Vue d'ensemble et gestion"
      />

      <div className="dashboard__content">
        <div className="row g-4">
          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#417972' }}>
                <i className="bi bi-cash-stack"></i>
              </div>
              <div className="stats__info">
                <h3>0 €</h3>
                <p>Revenus du mois</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#f2d381' }}>
                <i className="bi bi-graph-up"></i>
              </div>
              <div className="stats__info">
                <h3>0%</h3>
                <p>Taux d&apos;occupation</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#6e6f75' }}>
                <i className="bi bi-people"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Clients actifs</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#1a1a1a' }}>
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Avis moyens</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard__section">
          <h4 className="section__title">Gestion</h4>
          <div className="row g-3">
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/manager/analytics" className="action__card">
                <i className="bi bi-graph-up-arrow"></i>
                <h5>Analytics</h5>
                <p>Rapports et statistiques</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/manager/spaces" className="action__card">
                <i className="bi bi-building"></i>
                <h5>Espaces</h5>
                <p>Gérer les espaces</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/manager/blog" className="action__card">
                <i className="bi bi-pencil-square"></i>
                <h5>Blog CMS</h5>
                <p>Gérer les articles</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
