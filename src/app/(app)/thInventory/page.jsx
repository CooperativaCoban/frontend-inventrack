"use client";
import { apiSystem } from "@/api";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ComInventoryTable} from "./components";

export const thInventoryPage = () => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  
  const getProduct = async () => {
    await apiSystem
      .get(`/thInventory`)
      .then((response) => {
        setData(response?.data?.thInventorys);
        console.log(response);
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
      <ComInventoryTable thInventorys={data} onRefetch={setRefetch}></ComInventoryTable>
    </div>
  );
};

export default thInventoryPage;
