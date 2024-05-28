"use client";
import { apiSystem } from "@/api";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { RoleTable } from "./components";

export const page = () => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  
  const getRol = async () => {
    await apiSystem
      .get(`/role`)
      .then((response) => {
        setData(response?.data?.roles);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRol();
  }, [refetch]);

  return (
    <div className="w-full">
      <RoleTable roles={data} onRefetch={setRefetch}></RoleTable>
    </div>
  );
};

export default page;
