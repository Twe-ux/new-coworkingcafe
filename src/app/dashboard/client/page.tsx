import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default async function ClientDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <DashboardHeader
        title={`Bienvenue, ${session?.user.name}!`}
        subtitle="Votre espace de gestion"
      />

      <div className="dashboard__content">
        <div className="row g-4">
          {/* Stats Cards */}
          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#417972' }}>
                <i className="bi bi-calendar-check"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Réservations actives</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#f2d381' }}>
                <i className="bi bi-clock-history"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Heures réservées</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#6e6f75' }}>
                <i className="bi bi-receipt"></i>
              </div>
              <div className="stats__info">
                <h3>0 €</h3>
                <p>Dépenses totales</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-3">
            <div className="stats__card">
              <div className="stats__icon" style={{ backgroundColor: '#1a1a1a' }}>
                <i className="bi bi-star"></i>
              </div>
              <div className="stats__info">
                <h3>0</h3>
                <p>Points fidélité</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard__section">
          <h4 className="section__title">Actions rapides</h4>
          <div className="row g-3">
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/client/new-booking" className="action__card">
                <i className="bi bi-plus-circle"></i>
                <h5>Nouvelle réservation</h5>
                <p>Réserver un espace de travail</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/client/bookings" className="action__card">
                <i className="bi bi-calendar3"></i>
                <h5>Mes réservations</h5>
                <p>Voir toutes mes réservations</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="/dashboard/client/profile" className="action__card">
                <i className="bi bi-person-gear"></i>
                <h5>Mon profil</h5>
                <p>Gérer mes informations</p>
              </a>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="dashboard__section">
          <h4 className="section__title">Réservations récentes</h4>
          <div className="empty__state">
            <i className="bi bi-calendar-x"></i>
            <h5>Aucune réservation</h5>
            <p>Vous n&apos;avez pas encore de réservation</p>
            <a href="/dashboard/client/new-booking" className="common__btn">
              Faire une réservation
              <img src="/icons/arrow-up-right.svg" alt="arrow" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
