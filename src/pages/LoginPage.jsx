import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../services/mutaions";
import { setCookie } from "../utils/cookie";
import logo from "../assets/Union.jpg";
import styles from "./RegistrationPage.module.css";

function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { mutate } = useLogin();

  const changeHandler = (e) => {
    e.preventDefault();
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = (e) => {
    e.preventDefault();
    console.log("submit", form);
    const { username, password } = form;

    if (!username || !password)
      return alert("username and password is necessary!");

    mutate(form, {
      onSuccess: (data) => {
        console.log(data);
        setCookie("token", data?.token);
        navigate("/");
      },
      onError: (error) => console.log(error),
    });
  };

  // console.log(mutation);
  return (
    <form onSubmit={loginHandler} className={styles.form}>
      <div className={styles.formTitle}>
        <img src={logo} />
        <h3>فرم ورود</h3>
      </div>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={form.username}
        onChange={changeHandler}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={form.password}
        onChange={changeHandler}
      />
      <br />

      <button type="submit">ورود</button>
      <Link to="/register" className={styles.link}>
        ایجاد حساب کاربری
      </Link>
    </form>
  );
}

export default LoginPage;
