import React, { useState } from "react";
import styles from "../css/register.module.css";

export default function Login({ apiService }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function authorization() {
    apiService.login({ username, password });
  }

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
        <button type="button" className={styles.btn} onClick={authorization}>
          Sign in
        </button>
      </form>
    </>
  );
}
