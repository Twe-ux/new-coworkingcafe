"use client";

import SlideUp from "@/utils/animations/slideUp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Une erreur est survenue");
        setLoading(false);
        return;
      }

      // Succès - Redirection vers login
      router.push("/login?registered=true");
    } catch (err) {
      setError("Une erreur est survenue lors de la création du compte");
      setLoading(false);
    }
  };

  return (
    <>
      {/* <PageTitle title="Créer un compte" currentPage="Inscription" /> */}
      <section className="auth">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <SlideUp className="mb__120">
                <div className="auth__form py-0">
                  <h3 className="t__32 text-center">Rejoignez-nous !</h3>
                  <p className="auth__disc text-center">
                    Créez votre compte pour réserver votre espace
                  </p>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Nom complet</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Téléphone (optionnel)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+33 6 12 34 56 78"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Mot de passe</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                      <small className="form-text">
                        Minimum 8 caractères avec majuscule, minuscule et
                        chiffre
                      </small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        Confirmer le mot de passe
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <button
                      type="submit"
                      className="common__btn w-100"
                      disabled={loading}
                    >
                      {loading ? "Création..." : "Créer mon compte"}
                      <img src="/icons/arrow-up-right.svg" alt="arrow" />
                    </button>
                  </form>

                  <div className="auth__footer">
                    <p>
                      Déjà un compte ? <Link href="/login">Se connecter</Link>
                    </p>
                  </div>
                </div>
              </SlideUp>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
