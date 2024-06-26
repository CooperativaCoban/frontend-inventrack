"use client";
import { apiSystem } from "@/api";
import React, { useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { UserTable } from "./components";

export const page = () => {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const getUser = async () => {
    await apiSystem
      .get(`/user`)
      .then((response) => {
        setData(response?.data?.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, [refetch]);

  return (
    <div className="w-full">
      <UserTable users={data} onRefetch={setRefetch}></UserTable>
    </div>
  );
};

export default page;
