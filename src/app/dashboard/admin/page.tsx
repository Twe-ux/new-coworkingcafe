import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <DashboardHeader
        title="Dashboard Admin"
        subtitle="Administration système"
      />

      <div className="dashboard__content">
        <div className="row g-4">
          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#417972' }}>
                <i className="bi bi-people-fill"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Total utilisateurs</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#f2d381' }}>
                <i className="bi bi-building"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Espaces configurés</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#6e6f75' }}>
                <i className="bi bi-calendar-check"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Réservations totales</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#1a1a1a' }}>
                <i className="bi bi-file-earmark-text"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Articles de blog</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard__section">
          <h4 className="section__title">Administration</h4>
          <div className="row g-3">
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/admin/users" className="action__card">
                <i className="bi bi-person-lines-fill"></i>
                <h5>Utilisateurs</h5>
                <p>Gérer les utilisateurs</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/admin/settings" className="action__card">
                <i className="bi bi-gear"></i>
                <h5>Configuration</h5>
                <p>Paramètres du système</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/manager/spaces" className="action__card">
                <i className="bi bi-building-gear"></i>
                <h5>Espaces</h5>
                <p>Gérer les espaces</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/manager/blog" className="action__card">
                <i className="bi bi-file-text"></i>
                <h5>Blog</h5>
                <p>Gestion du contenu</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/manager/analytics" className="action__card">
                <i className="bi bi-bar-chart"></i>
                <h5>Analytics</h5>
                <p>Statistiques avancées</p>
              </a>
            </div>
          </div>
        </div>

        <div className="dashboard__section">
          <h4 className="section__title">Activité système</h4>
          <div className="activity__list">
            <div className="empty__state">
              <i className="bi bi-clock-history"></i>
              <p>Aucune activité récente</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
