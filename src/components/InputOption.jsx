"use client";
import React, { useState, useEffect } from "react";
import { TreeSelect } from "primereact/treeselect";
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InputOption = (props) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [roles, setRoles] = useState([]); // Estado para almacenar los roles

  const getRol = async () => {
    try {
      const response = await apiSystem.get(`/role`);
      const rolesData = response.data?.roles;
      // Mapeamos los datos para obtener solo los nombres de los roles
      const roleNames = rolesData.map((r) => ({
        key: r.pk_role,
        label: r.role, // Aquí accedemos al campo "rol"
      }));
      setRoles(roleNames);
    } catch (error) {}
  };

  useEffect(() => {
    getRol();
  }, []);

  const handleChange = async (e) => {
    setSelectedNodeKey(e?.value || null);
    props?.onSelect(e?.value);
  };

  return (
    <div className="card flex justify-content-center">
      <TreeSelect
        value={selectedNodeKey || props?.role}
        onChange={handleChange}
        options={roles}
        selectionMode="single"
        className="md:w-20rem w-full"
        placeholder="Seleccione un rol"
      />
    </div>
  );
};

export default InputOption;
