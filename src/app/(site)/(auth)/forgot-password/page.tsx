'use client';

import { useState } from 'react';
import Link from 'next/link';
import SlideUp from '@/utils/animations/slideUp';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Implement password reset API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setError('Une erreur est survenue');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="auth">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <SlideUp className="mb__120">
                <div className="auth__form py-0">
                  <div className="text-center mb-4">
                    <div className="success-icon mb-3">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="var(--main-clr)" strokeWidth="2"/>
                        <path d="M8 12L11 15L16 9" stroke="var(--main-clr)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="t__32">Email envoyé !</h3>
                    <p className="auth__disc mt-3">
                      Un email de réinitialisation a été envoyé à <strong>{email}</strong>
                    </p>
                    <p className="auth__disc">
                      Vérifiez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passe.
                    </p>
                  </div>

                  <Link href="/login" className="common__btn w-100">
                    Retour à la connexion
                    <img src="/icons/arrow-up-right.svg" alt="arrow" />
                  </Link>
                </div>
              </SlideUp>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <SlideUp className="mb__120">
              <div className="auth__form py-0">
                <h3 className="t__32 text-center">Mot de passe oublié ?</h3>
                <p className="auth__disc text-center">
                  Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe
                </p>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="common__btn w-100"
                    disabled={loading}
                  >
                    {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
                    <img src="/icons/arrow-up-right.svg" alt="arrow" />
                  </button>
                </form>

                <div className="auth__footer">
                  <p>
                    <Link href="/login">Retour à la connexion</Link>
                  </p>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </div>
    </section>
  );
}
