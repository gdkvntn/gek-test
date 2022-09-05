import React from "react";
import styles from "../css/main.module.css";

export default function Main({ apiService, stats, sortData }) {
  return (
    <>
      <div className={styles.container}>
        <ul>
          <li className={styles.stats}>
            <span
              className={styles.statsItem}
              onClick={() => sortData("target")}
            >
              Ссылка
            </span>
            <span
              className={styles.statsItem}
              onClick={() => sortData("short")}
            >
              Исходная ссылка
            </span>
            <span
              className={styles.statsItem}
              onClick={() => sortData("counter")}
            >
              {" "}
              Кол-во переходов
            </span>
          </li>
          {stats.map((el, i) => {
            return (
              <li className={styles.stats} key={el.id}>
                <a href={el.target} className={styles.statsItem}>
                  {el.target}
                </a>
                <a className={styles.statsItem} href={el.target}>
                  {`${apiService.url}/s/${el.short}`}
                </a>
                <span className={styles.statsItem}>{el.counter}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
