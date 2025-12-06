import React from "react";

interface DashboardIconProps {
  className?: string;
  size?: number;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({
  className = "",
  size = 20,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Grand panneau en haut à gauche */}
      <rect
        x="2"
        y="2"
        width="10"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ligne de séparation horizontale */}
      <path
        d="M7 2V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      {/* Ligne de séparation verticale */}
      <path
        d="M2 7H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      
      {/* Panneau horizontal en haut à droite */}
      <rect
        x="14"
        y="2"
        width="8"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ligne de séparation */}
      <path
        d="M18 2V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      
      {/* Panneau vertical en bas à droite */}
      <rect
        x="14"
        y="10"
        width="8"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ligne de séparation */}
      <path
        d="M18 10V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      
      {/* Panneau en bas à gauche */}
      <rect
        x="2"
        y="14"
        width="10"
        height="8"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ligne de séparation */}
      <path
        d="M7 14V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      
      {/* Points décoratifs pour ajouter de la profondeur */}
      <circle
        cx="4.5"
        cy="4.5"
        r="0.75"
        fill="currentColor"
        opacity="0.6"
      />
      <circle
        cx="9.5"
        cy="4.5"
        r="0.75"
        fill="currentColor"
        opacity="0.6"
      />
      <circle
        cx="4.5"
        cy="9.5"
        r="0.75"
        fill="currentColor"
        opacity="0.6"
      />
      <circle
        cx="16"
        cy="4.5"
        r="0.75"
        fill="currentColor"
        opacity="0.6"
      />
      <circle
        cx="20"
        cy="4.5"
        r="0.75"
        fill="currentColor"
        opacity="0.6"
      />
      <circle
        cx="16"
        cy="16"
        r="0.75"
        fill="currentColor"
        opacity="0.6"
      />
      <circle
        cx="20"
        cy="16"
        r="0.75"
        fill="currentColor"
        opacity="0.6"
      />
      <circle
        cx="4.5"
        cy="17.5"
        r="0.75"
        fill="currentColor"
        opacity="0.6"
      />
      <circle
        cx="9.5"
        cy="17.5"
        r="0.75"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
};

export default DashboardIcon;


