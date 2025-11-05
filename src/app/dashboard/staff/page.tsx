import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default async function StaffDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <DashboardHeader
        title="Dashboard Staff"
        subtitle="Gestion quotidienne"
      />

      <div className="dashboard__content">
        <div className="row g-4">
          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#417972' }}>
                <i className="bi bi-calendar-day"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Réservations aujourd&apos;hui</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#f2d381' }}>
                <i className="bi bi-person-check"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Check-ins en attente</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#6e6f75' }}>
                <i className="bi bi-door-open"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Espaces occupés</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#1a1a1a' }}>
                <i className="bi bi-clock"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Réservations à venir</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard__section">
          <h4 className="section__title">Actions rapides</h4>
          <div className="row g-3">
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/staff/today" className="action__card">
                <i className="bi bi-list-check"></i>
                <h5>Réservations du jour</h5>
                <p>Voir la liste complète</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/staff/checkin" className="action__card">
                <i className="bi bi-check-circle"></i>
                <h5>Check-in/Check-out</h5>
                <p>Gérer les arrivées et départs</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
