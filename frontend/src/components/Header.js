import logo from './../images/logo.svg';

function Header(props) {
  const { children } = props;
  return (
    <header className='header'>
      <img src={logo} alt='Логотип сайта' className='header__logo' />
      {children}
    </header>
  );
}

export default Header;
