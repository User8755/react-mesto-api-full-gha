function ImagePopup(props) {
  const { card, onClose } = props;
  return (
    <section
      className={
        card.name
          ? 'popup popup_type_img popup_visible'
          : 'popup popup_type_img'
      }
    >
      <div className='popup__container-img'>
        <figure className='popup__figure'>
          <img src={card.link} alt={card.name} className='popup__img' />
          <figcaption className='popup__figcaption'>{card.name}</figcaption>
        </figure>
        <button
          className='popup__btn-exit popup__btn-exit_img button'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
