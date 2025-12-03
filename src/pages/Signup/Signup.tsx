import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import logo from "../../assets/logo.png";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Grimoire d'Áether" className="login-logo" />
          <h1 className="login-title">Créer un compte</h1>
          <p className="login-subtitle">
            Rejoignez le Grimoire d'Áether pour gérer le contenu
          </p>
        </div>

        <div className="login-content">
          <SignUp
            routing="path"
            path="/signup"
            afterSignUpUrl="/admin"
            signInUrl="/login"
          />

          <div className="login-footer">
            <button
              className="login-button login-button-home"
              onClick={() => navigate("/")}
            >
              <span className="login-button-icon">🏠</span>
              <span>Retour à l'accueil</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
