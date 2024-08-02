"use client";
import React, { useState, useEffect } from "react";
import { TreeSelect } from "primereact/treeselect";
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InputOption = (props) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [users, setUsers] = useState([]); // Estado para almacenar los users

  const getUser = async () => {
    try {
      const response = await apiSystem.get(`/user`);
      const userData = response.data?.users;
      // Mapeamos los datos para obtener solo los nombres de los users
      const userNames = userData.map((r) => ({
        key: r.pk_user,
        label: r.name_user, // Aquí accedemos al campo "nombre usuario"
      }));
      setUsers(userNames);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = async (e) => {
    setSelectedNodeKey(e?.value || null);
    props?.onSelect(e?.value);
  };

  return (
    <div className="card flex justify-content-center">
      <TreeSelect
        value={selectedNodeKey || props?.name}
        onChange={handleChange}
        options={users}
        selectionMode="single"
        className="md:w-20rem w-full"
        placeholder="Seleccione al usuario"
      />
    </div>
  );
};

export default InputOption;