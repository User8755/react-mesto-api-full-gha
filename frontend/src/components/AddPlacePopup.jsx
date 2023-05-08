import PopupWithForm from "./PopupWithForm.js";
import { useRef, useEffect } from "react";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props;
  const cardLink = useRef("");
  const cardName = useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      link: cardLink,
      name: cardName,
    });
  }
  useEffect(() => {
    cardName.current.value = "";
    cardLink.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="card-add"
      title="Новое место"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          id="input-place-name"
          type="text"
          name="placename"
          placeholder="Название"
          className="popup__input popup__input_type_place-name"
          required
          minLength="2"
          maxLength="30"
          ref={cardName}
        />
        <span className="popup__span input-place-name-error"></span>
        <input
          id="input-url-img"
          type="url"
          name="urlimg"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_url-img"
          required
          ref={cardLink}
        />
        <span className="popup__span input-url-img-error"></span>
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

export default AddPlacePopup;
