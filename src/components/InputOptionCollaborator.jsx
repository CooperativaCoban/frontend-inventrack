"use client";
import React, { useState, useEffect } from "react";
import { TreeSelect } from "primereact/treeselect";
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InputOptionCollaborator = (props) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [collaborators, setCollaborators] = useState([]); // Estado para almacenar los collaborators

  const getCollaborator = async () => {
    try {
      const response = await apiSystem.get(`/collaborator`);
      const collaboratorsData = response.data?.collaborators;
      // Mapeamos los datos para obtener solo los nombres de los collaborators
      const collaboratorNames = collaboratorsData.map((r) => ({
        key: r.pk_collaborator,
        label: r.name, // Aquí accedemos al campo "nombre usuario"
      }));
      setCollaborators(collaboratorNames);
    } catch (error) {}
  };

  useEffect(() => {
    getCollaborator();
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
        options={collaborators}
        selectionMode="single"
        className="md:w-20rem w-full"
        placeholder="Seleccione al usuario"
      />
    </div>
  );
};

export default InputOptionCollaborator;