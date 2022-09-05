import React from "react";
import styles from "../css/pagination.module.css";

export default function Pagination({ PerPage, totalStats, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStats / PerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={styles.list}>
        {pageNumbers.map((num) => {
          return (
            <li key={num}>
              <a href="!#" onClick={() => paginate(num)}>
                {num}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
