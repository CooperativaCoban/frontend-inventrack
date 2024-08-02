"use client";
import React, { useState, useEffect } from "react";
import { TreeSelect } from "primereact/treeselect";
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InputOptionArea = (props) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [areas, setAreas] = useState([]); // Estado para almacenar los areas

  const getArea = async () => {
    try {
      const response = await apiSystem.get(`/area`);
      const areaData = response.data?.areas;
      // Mapeamos los datos para obtener solo los nombres de los areas
      const areaNames = areaData.map((r) => ({
        key: r.pk_area,
        label: r.area, // Aquí accedemos al campo "nombre usuario"
      }));
      setAreas(areaNames);
    } catch (error) {}
  };

  useEffect(() => {
    getArea();
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
        options={areas}
        selectionMode="single"
        className="md:w-20rem w-full"
        placeholder="Seleccione al usuario"
      />
    </div>
  );
};

export default InputOptionArea;