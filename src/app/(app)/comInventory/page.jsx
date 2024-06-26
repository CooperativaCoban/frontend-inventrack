"use client";
import { apiSystem } from "@/api";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ComInventoryTable} from "./components";

export const comInventoryPage = () => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  
  const getProduct = async () => {
    await apiSystem
      .get(`/comInventory`)
      .then((response) => {
        setData(response?.data?.comInventorys);
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
      <ComInventoryTable comInventorys={data} onRefetch={setRefetch}></ComInventoryTable>
    </div>
  );
};

export default comInventoryPage;
