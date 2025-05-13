import { useState } from "react";
import { ToastContainer } from "react-toastify";
import logo from "../asset/images/setting-3.png";
import Product from "../components/Product";
import Search from "../components/Search";
import PageNation from "../components/PageNation";
import styles from "../components/Dashboard.module.css";
import { GetProductsApi } from "../services/api";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");

  const queryKey = ["ListProduct", page, name];
  const fetchProducts = async () => {
    const response = await GetProductsApi(page, name);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: fetchProducts,
    keepPreviousData: true, // نگه‌داشتن داده‌های قبلی برای تغییرات صفحه
  });

  return (
    <div className={styles.DashboardContainer}>
      <Search name={name} setName={setName} />
      <div className={styles.DashboardLogoContainer}>
        <div className={styles.DashboardLogoDiv}>
          <img src={logo} alt="logo" />
          <span>Product Management</span>
        </div>
        <button>Add Product</button>
      </div>
      <div className={styles.DashboardProductDiv}>
        <div className={styles.DashboardSpanDiv}>
          <span>Product Name</span>
          <span>Inventory</span>
          <span>Price</span>
          <span>Product ID</span>
        </div>
        {data?.data.map((item) => (
          <Product data={item} key={item.id} />
        ))}
      </div>
      {!isLoading && <PageNation page={page} setPage={setPage} data={data} />}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
