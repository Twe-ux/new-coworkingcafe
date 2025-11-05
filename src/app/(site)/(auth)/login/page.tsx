"use client";

import SlideUp from "@/utils/animations/slideUp";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        // Redirection vers dashboard
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Une erreur est survenue");
      setLoading(false);
    }
  };

  return (
    <>
      {/* <PageTitle title="Connexion" currentPage="Connexion" /> */}
      <section className="auth ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 ">
              <SlideUp className="mb__120">
                <div className="auth__form py-0">
                  <h3 className="t__32 text-center">Bienvenue !</h3>
                  <p className="auth__disc text-center">
                    Connectez-vous pour accéder à votre espace
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
                        value={formData.email}
                        onChange={handleChange}
                        required
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
                    </div>

                    <div className="auth__actions">
                      <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Se souvenir de moi</label>
                      </div>
                      <Link href="/forgot-password" className="forgot-link">
                        Mot de passe oublié ?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="common__btn w-100"
                      disabled={loading}
                    >
                      {loading ? "Connexion..." : "Se connecter"}
                      <img src="/icons/arrow-up-right.svg" alt="arrow" />
                    </button>
                  </form>

                  <div className="auth__footer">
                    <p>
                      Pas encore de compte ?{" "}
                      <Link href="/register">Créer un compte</Link>
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
