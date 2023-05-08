import Header from "./Header.js";
import { NavLink } from "react-router-dom";

function Register(props) {
  const {change, submit} = props
  // const [formValue, setFormValue] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormValue({
  //     ...formValue,
  //     [name]: value,
  //   });
  // };
  // console.log(formValue);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // auth
  // .register(formValue)
  //     .then((res) => console.log(res))
  //     .catch(
  //       <InfoTooltip
  //         text="Что-то пошло не так!
  //   Попробуйте ещё раз."
  //         icon="../images/iconFail.svg"
  //         name="infoTooltip"
  //       ></InfoTooltip>
  //     )
  //     .finally();
  // };

  return (
    <>
      <Header>
        <NavLink to="/sign-in" className="header__btn">
          Войти
        </NavLink>
      </Header>
      <section className="register">
        <h2 className="register__title">Регистрация</h2>
        <form className="form" onSubmit={submit}>
          <input
            id="email"
            className="input_type-email input"
            placeholder="Email"
            name="email"
            type="email"
            value={submit.email}
            onChange={change}
            autoComplete="on"
          ></input>
          <input
            className="input_type-password input"
            placeholder="Пароль"
            type="password"
            name="password"
            value={submit.password}
            onChange={change}
            autoComplete="off"
          ></input>
          <button
            className="button_submit"
            type="submit"
            onSubmit={submit}
          >
            Зарегистрироваться
          </button>
        </form>
        <NavLink to="/sign-in" className="register__link">
          Уже зарегистрированы? Войти
        </NavLink>
      </section>
    </>
  );
}

export default Register;
