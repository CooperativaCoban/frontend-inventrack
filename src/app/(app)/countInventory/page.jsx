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

  
  const getProduct = async () => {
    await apiSystem
      .get(`/countInventory`)
      .then((response) => {
        setData(response?.data?.countInventorys);
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
      <CountInventoryTable countInventorys={data} onRefetch={setRefetch}></CountInventoryTable>
    </div>
  );
};

export default countInventoryPage;
