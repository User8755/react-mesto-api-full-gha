import PopupWithForm from "./PopupWithForm.js";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { isOpen, onClose } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          id="input-name"
          type="text"
          name="profilename"
          placeholder="Имя"
          className="popup__input popup__input_type_name"
          required
          minLength="2"
          maxLength="20"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__span input-name-error"></span>
        <input
          id="input-work"
          type="text"
          name="profilework"
          placeholder="Работа"
          className="popup__input popup__input_type_work"
          required
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__span input-work-error"></span>
      </fieldset>
      <button
            className="popup__btn-save popup__btn-save-disable button"
            type="submit"
          >
            Сохранить
          </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
