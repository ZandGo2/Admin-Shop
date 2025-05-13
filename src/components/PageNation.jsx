import styles from "./Dashboard.module.css";

const PageNation = ({ page, setPage, data }) => {
  const totalPages = data.totalPages;

  return (
    <div className={styles.PageNationContainer}>
      {Array.from({ length: totalPages }).map((i, index) => (
        <button
          key={index}
          className={
            index + 1 == page
              ? styles.PageNationBtnActive
              : styles.PageNationBtnNotActive
          }
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default PageNation;
