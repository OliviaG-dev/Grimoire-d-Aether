import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/logo.png";

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Grimoire d'Áether" className="login-logo" />
          <h1 className="login-title">Accès Administration</h1>
        </div>

        <div className="login-content">
          <SignIn
            routing="path"
            path="/login"
            afterSignInUrl="/admin"
            signUpUrl="/signup"
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

export default Login;
