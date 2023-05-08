import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header.js";
import { useNavigate } from 'react-router-dom';

function Main(props) {
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    serverCard,
    onCardLike,
    onCardDelete,
    userEmail,
  } = props;
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <div className="header__container">
          <p className="header__container_user-info">{userEmail}</p>
          <button
            className="header__container_btn-exit button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/sign-in", { replace: true });
            }}
          >
            Выход
          </button>
        </div>
      </Header>
      <main className="main">
        <section className="profile">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt="Аватар профиля"
              className="profile__avatar-img"
            />
            <button
              className="profile__btn-edit-avatar"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__btn-edit button"
                title="Редактировать профиль"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__work">{currentUser.about}</p>
          </div>
          <button
            className="profile__btn-add button"
            title="Добавить изображение"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="photo">
          {serverCard.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
