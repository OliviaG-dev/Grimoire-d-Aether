import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";

declare global {
  interface Window {
    netlifyIdentity?: any;
  }
}

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Le script Netlify Identity est déjà chargé dans index.html
    // Attendre qu'il soit disponible et l'initialiser
    const initIdentity = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.init();

        // Vérifier si l'utilisateur est déjà connecté
        window.netlifyIdentity.on("init", (user: any) => {
          setIsLoading(false);
          if (user) {
            setIsLoggedIn(true);
            setUserEmail(user.email);
            // Rediriger vers /admin après 1 seconde
            setTimeout(() => {
              window.location.href = "/admin/";
            }, 1000);
          }
        });

        // Gérer la connexion réussie
        window.netlifyIdentity.on("login", (user: any) => {
          setIsLoggedIn(true);
          setUserEmail(user.email);
          setError(null);
          // Rediriger vers /admin
          setTimeout(() => {
            window.location.href = "/admin/";
          }, 1000);
        });

        // Gérer les erreurs
        window.netlifyIdentity.on("error", (err: any) => {
          setError(err.message || "Une erreur est survenue");
          setIsLoading(false);
        });

        // Vérifier immédiatement si déjà connecté
        const currentUser = window.netlifyIdentity.currentUser();
        if (currentUser) {
          setIsLoggedIn(true);
          setUserEmail(currentUser.email);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    // Vérifier si le script est déjà disponible
    if (window.netlifyIdentity) {
      initIdentity();
    } else {
      // Attendre que le script se charge (déjà présent dans index.html)
      const checkInterval = setInterval(() => {
        if (window.netlifyIdentity) {
          clearInterval(checkInterval);
          initIdentity();
        }
      }, 100);

      // Timeout après 5 secondes
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.netlifyIdentity) {
          setIsLoading(false);
          setError("Netlify Identity n'a pas pu être chargé. Veuillez recharger la page.");
        }
      }, 5000);

      return () => {
        clearInterval(checkInterval);
      };
    }
  }, []);

  const handleLogin = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open("login");
    } else {
      setError("Netlify Identity n'est pas chargé. Veuillez recharger la page.");
    }
  };

  const handleSignup = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open("signup");
    } else {
      setError("Netlify Identity n'est pas chargé. Veuillez recharger la page.");
    }
  };

  if (isLoading) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-loading">
            <div className="login-spinner"></div>
            <p>Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoggedIn && userEmail) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-success">
            <div className="login-success-icon">✓</div>
            <h2>Connecté avec succès !</h2>
            <p>Bienvenue, <strong>{userEmail}</strong></p>
            <p className="login-redirect">Redirection vers l'administration...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Grimoire d'Áether" className="login-logo" />
          <h1 className="login-title">Accès Administration</h1>
          <p className="login-subtitle">
            Connectez-vous pour gérer le contenu du Grimoire d'Áether
          </p>
        </div>

        <div className="login-content">
          {error && (
            <div className="login-error">
              <span className="login-error-icon">⚠</span>
              <p>{error}</p>
            </div>
          )}

          <div className="login-buttons">
            <button className="login-button login-button-primary" onClick={handleLogin}>
              <span className="login-button-icon">🔐</span>
              <span>Se connecter</span>
            </button>

            <button className="login-button login-button-secondary" onClick={handleSignup}>
              <span className="login-button-icon">✨</span>
              <span>Créer un compte</span>
            </button>
          </div>

          <div className="login-info">
            <p>
              <small>
                L'accès à l'administration nécessite une invitation.
                Contactez l'administrateur si vous n'avez pas de compte.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

