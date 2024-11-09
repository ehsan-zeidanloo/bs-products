import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegister } from "../services/mutaions";
import styles from "./RegistrationPage.module.css";
import logo from "../assets/Union.jpg";

function RegistrationPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { mutate } = useRegister();

  const changeHandler = (e) => {
    e.preventDefault();
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const registerHandler = (e) => {
    e.preventDefault();

    const { username, password, confirmPassword } = form;

    if (!username || !password)
      return alert("username and password is necessary!");
    if (password !== confirmPassword) return alert("password Isn't the Same");

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log(data);
          navigate("/login");
        },
        onError: (error) => console.log(error),
      }
    );
  };
  return (
    <>
      <form onSubmit={registerHandler} className={styles.form}>
        <div className={styles.formTitle}>
          <img src={logo} />
          <h3>فرم ثبت نام</h3>
        </div>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={form.userName}
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          value={form.confirmPassword}
          onChange={changeHandler}
        />
        <br />
        <button type="submit">ثبت نام</button>
        <Link to="/login" className={styles.link}>
          حساب کاربری دارید
        </Link>
      </form>
    </>
  );
}

export default RegistrationPage;
