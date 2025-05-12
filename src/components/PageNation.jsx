import React from "react";
import styles from "./Dashbord.module.css";

const PageNation = () => {
  return (
    <div className={styles.PageNationContainer}>
      <button className={styles.PageNationBtn}>1</button>
      <button className={styles.PageNationBtn}>2</button>
      <button className={styles.PageNationBtn}>3</button>
    </div>
  );
};

export default PageNation;
