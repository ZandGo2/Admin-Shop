import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import logo from "../asset/images/setting-3.png";
import Product from "../components/Product";
import Search from "../components/Search";
import PageNation from "../components/PageNation";
import styles from "../components/Dashbord.module.css";

const Dashbord = () => {
  return (
    <div className={styles.DashbordContainer}>
      <Search />
      <div className={styles.DashbordLogoContainer}>
        <div className={styles.DashbordLogoDiv}>
          <img src={logo} alt="logo" />
          <span>Product Management</span>
        </div>
        <button>Add Product</button>
      </div>
      <div className={styles.DashbordProductDiv}>
        <div className={styles.DashbordSpanDiv}>
          <span>Product Name</span>
          <span>Inventory</span>
          <span>Price</span>
          <span>Product ID</span>
        </div>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      <PageNation />
      <ToastContainer />
    </div>
  );
};

export default Dashbord;
