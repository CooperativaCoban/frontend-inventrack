"use client";
import { apiSystem } from "@/api";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { CountInventoryTable} from "./components";

export const countInventoryPage = () => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  
  const getProduct = async () => {
    await apiSystem
      .get(`/countInventory`)
      .then((response) => {
        const data = response?.data?.countInventorys.map(product => ({
          ...product,
          d_date: formatDateString(product.d_date)
        }));
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProduct();
  }, [refetch]);

  return (
    <div className="w-full">
      <CountInventoryTable countInventorys={data} onRefetch={setRefetch}></CountInventoryTable>
    </div>
  );
};

export default countInventoryPage;
