function PopupWithForm(props) {
  const { name, title, children, isOpen, onClose, buttonText, onSubmit } = props;

  return (
    <section
      className={
        isOpen
          ? `popup popup_type_${name}  popup_visible`
          : `popup popup_type_${name}`
      }
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="form" name={name} onSubmit={onSubmit}>
          {children}
          
        </form>
        <button
          className="popup__btn-exit button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
