import React, { useState } from "react";
import styles from "../css/register.module.css";

export default function Register({ apiService }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <form className={styles.form}>
        <span>Login</span>
        <input
          type="mail"
          className={styles.login}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span>Password</span>
        <input
          type="password"
          className={styles.pass}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className={styles.btn}
          onClick={() => apiService.registrate({ username, password })}
        >
          Login
        </button>
      </form>
    </>
  );
}
