function InfoTooltip(props) {
  const { infoToolTipState, onClose, name } = props;

  return (
    <section
      className={
        infoToolTipState.isOpen
          ? `popup popup_type_${name}  popup_visible`
          : `popup popup_type_${name}`
      }
    >
      <div className='popup__container'>
        <img
          className='infoTooltip__icon'
          src={infoToolTipState.icon}
          alt='здесь могла быть Ваша реклама'
        />
        <p className='infoTooltip__text'>{infoToolTipState.text}</p>
        <button
          className='popup__btn-exit button'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
