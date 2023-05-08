import PopupWithForm from "./PopupWithForm.js";
import { useRef, useEffect } from "react";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const avatar = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatar,
    });
  }

  useEffect(() => {
    avatar.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          id="input-url-avtar"
          type="url"
          name="urlAvatar"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_url-avatar"
          required
          ref={avatar}
        />
        <span className="popup__span input-url-avtar-error"></span>
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

export default EditAvatarPopup;
