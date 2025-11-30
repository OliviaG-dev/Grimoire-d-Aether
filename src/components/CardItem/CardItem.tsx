import React from "react";
import './CardItem.css';

interface CardItemProps {
  id: string;
  gameId: string;
  name: string;
  image?: string;
  keywords?: string[];
}

const CardItem: React.FC<CardItemProps> = ({
  id,
  gameId,
  name,
  image,
  keywords,
}) => {
  return (
    <div className="card-item" data-id={id} data-game-id={gameId}>
      <h3>{name}</h3>
      {image && <img src={image} alt={name} />}
      {keywords && keywords.length > 0 && (
        <div className="keywords">
          <strong>Mots-clés :</strong> {keywords.join(", ")}
        </div>
      )}
    </div>
  );
};

export default CardItem;

