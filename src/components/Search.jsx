import React from "react";
import logoSearch from "../asset/images/search-normal.png";
import profile from "../asset/images/Felix-Vogel-4.png";
import styles from "./Dashbord.module.css";

const Search = () => {
  const changeHandler = () => {
    console.log("first");
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputDiv}>
        <img src={logoSearch} alt="logoSearch" />
        <input
          type="text"
          onChange={changeHandler}
          placeholder="Search ......."
        />
      </div>
      <div className={styles.searchProfileDiv}>
        <img src={profile} alt="profile" />
        <div className={styles.searchProfile}>
          <span>Milad Azimi</span>
          <span>Boss</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
