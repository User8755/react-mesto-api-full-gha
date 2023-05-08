import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <article className="card">
      {isOwn && (
        <button
          className="card__btn-delete"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="card__img"
        onClick={() => onCardClick(card)}
      />
      <div className="card__description">
        <h3 className="card__title">{card.name}</h3>
        <div className="card__block">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => handleLikeClick()}
          ></button>
          <span className="card__span">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
