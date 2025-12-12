import React from "react";

interface CrystalIconProps {
  className?: string;
  size?: number;
}

const CrystalIcon: React.FC<CrystalIconProps> = ({
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
      {/* Forme principale du cristal */}
      <path
        d="M12 2L15 8L21 9L15 10L12 16L9 10L3 9L9 8L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
      {/* Lignes intérieures pour l'effet cristal */}
      <path
        d="M12 2V8M12 8V16M12 8L9 10M12 8L15 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
      {/* Points lumineux */}
      <circle
        cx="12"
        cy="8"
        r="1.5"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  );
};

export default CrystalIcon;

