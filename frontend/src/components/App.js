import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import '../index.css';
import Main from './Main.jsx';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Register from './Register.jsx';
import Login from './Login .jsx';
import ProtectedRouteElement from './ProtectedRoute.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/Auth.js';
import iconFail from '../images/iconFail.svg';
import iconSuccess from '../images/iconSuccess.svg';
import api from '../utils/Api';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLogin, setLogin] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();
  const [infoToolTipState, setInfoToolTipState] = useState({
    isOpen: false,
    text: '',
    icon: '',
  });

  const jwt = localStorage.getItem('token');

  useEffect(() => {
    if (jwt) {
      auth
        .tokenValid()
        .then((res) => {
          setLogin(true);
          setUserEmail(res.email);
          navigate('/main', { replace: true });
        })
        .catch((res) => console.log(res));
    }
  }, [jwt, navigate]);

  useEffect(() => {
    if (isLogin) {
      Promise.all([api.userInfoApi(jwt), api.getInitialCards(jwt)])
        .then(([userData, serverCard]) => {
          setCurrentUser(userData);
          setCards(serverCard);
        })
        .catch((error) => {
          console.log(`Код ошибки1: ${error}`);
        });
    }
  }, [isLogin, jwt]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoToolTipState({ ...infoToolTipState, isOpen: false });
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleLogin = () => {
    setLogin(!isLogin);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(`Код ошибки: ${error}`);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCards(card._id, jwt)
      .then(setCards((res) => res.filter((item) => item._id !== card._id)))
      .catch((error) => {
        console.log(`Код ошибки: ${error}`);
      });
  };

  const handleUpdateUser = (profileData) => {
    api
      .updateUserInfo(profileData, jwt)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log(`Код ошибки: ${error}`);
      })
      .finally(closeAllPopups());
  };

  const handleUpdateAvatar = (item) => {
    api
      .loadAvatar(item, jwt)
      .then((res) => setCurrentUser(res))
      .catch((error) => {
        console.log(`Код ошибки: ${error}`);
      })
      .finally(closeAllPopups());
  };

  const handleAddPlaceSubmit = (item) => {
    api
      .loadImg(item, jwt)
      .then((serverCard) => setCards([serverCard, ...cards]))
      .catch((error) => {
        console.log(`Код ошибки: ${error}`);
      })
      .finally(closeAllPopups());
  };

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    auth
      .register(formValue)
      .then(() => {
        setInfoToolTipState({
          ...infoToolTipState,
          isOpen: true,

          text: 'Вы успешно зарегистрировались!',
          icon: iconSuccess,
        });
        navigate('/sign-in', { replace: true });
      })
      .catch((res) => {
        setInfoToolTipState({
          ...infoToolTipState,
          isOpen: true,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          icon: iconFail,
        });
        console.log(res);
      });
  };

  const handleSubmitSignin = (evt) => {
    evt.preventDefault();
    auth
      .signin(formValue)
      .then((res) => {
        if (res) {
          handleLogin();
          localStorage.setItem('token', res.token);
          navigate('/main', { replace: true });
        }
      })
      .catch((res) => {
        setInfoToolTipState({
          ...infoToolTipState,
          isOpen: true,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          icon: iconFail,
        });
        console.log(res);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <div className='page'>
          <Routes>
            <Route
              path='/main'
              element={
                <ProtectedRouteElement
                  loggedIn={isLogin}
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  serverCard={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  userEmail={userEmail}
                />
              }
            />
            <Route
              path='/sign-in'
              element={
                <Login change={handleChange} submit={handleSubmitSignin} />
              }
            />
            <Route
              path='/sign-up'
              element={
                <Register change={handleChange} submit={handleSubmitRegister} />
              }
            />
            <Route
              path='/'
              element={
                handleLogin ? (
                  <Navigate to='/sign-in' replace />
                ) : (
                  <Navigate to='/main' replace />
                )
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleEditProfileClick}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleAddPlaceClick}
            onAddPlace={handleAddPlaceSubmit}
          ></AddPlacePopup>
          <PopupWithForm
            name='delete'
            title='Вы уверены?'
            buttonText='Да'
          ></PopupWithForm>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          ></EditAvatarPopup>
          <InfoTooltip
            infoToolTipState={infoToolTipState}
            onClose={closeAllPopups}
            name={'infoTooltip'}
          ></InfoTooltip>
          <ImagePopup card={selectedCard} onClose={handleCardClick} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
