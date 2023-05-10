import Header from "./Header.js";
import { NavLink } from "react-router-dom";

function Login(props) {
  const {change, submit} = props
  return (
    <>
      <Header>
        <NavLink to="/sign-up" className="header__btn">
          Регистрация
        </NavLink>
      </Header>
      <section className="login">
        <h2 className="login__title">Вход</h2>
        <form className="form" method='POST' onSubmit={submit}>
          <input
            className="input_type-email input"
            placeholder="Email"
            type="email"
            autoComplete="off"
            name="email"
            value={submit.email}
            onChange={change}
          ></input>
          <input
            className="input_type-password input"
            placeholder="Пароль"
            type="password"
            autoComplete="off"
            name="password"
            value={submit.password}
            onChange={change}
          ></input>
          <button className="button_submit" onSubmit={submit}>Войти</button>
        </form>
      </section>
    </>
  );
}

export default Login;
