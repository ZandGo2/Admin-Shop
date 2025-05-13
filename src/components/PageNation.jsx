import React from "react";
import styles from "./Dashbord.module.css";

const PageNation = () => {
  return (
    <div className={styles.PageNationContainer}>
      <button className={styles.PageNationBtnNotActive}>1</button>
      <button className={styles.PageNationBtnActive}>2</button>
      <button className={styles.PageNationBtnNotActive}>3</button>
    </div>
  );
};

export default PageNation;
