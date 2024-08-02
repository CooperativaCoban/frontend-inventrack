"use client";
import React, { useState, useEffect } from "react";
import { TreeSelect } from "primereact/treeselect";
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InputOptionInventoryCount = (props) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [productsConta, setProductsConta] = useState([]); // Estado para almacenar los productos

  const getProductConta = async () => {
    try {
      const response = await apiSystem.get(`/countInventory`);
      const productContaData = response.data?.countInventorys;
      // Mapeamos los datos para obtener solo los nombres de los countinventorys
      const productContaNames = productContaData.map((r) => ({
        key: r.pk_countinventory,
        label: r.product,
      
      }));
      setProductsConta(productContaNames);
    } catch (error) {}
  };

  useEffect(() => {
    getProductConta();
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
      options={productsConta}
      selectionMode="single"
      className="md:w-20rem w-full"
      placeholder="Seleccione un producto"
    />
  </div>
  );
};

export default InputOptionInventoryCount;
