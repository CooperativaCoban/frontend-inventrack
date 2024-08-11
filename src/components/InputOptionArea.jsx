"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InputOptionArea = (props) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [areas, setAreas] = useState([]);

  const getArea = async () => {
    try {
      const response = await apiSystem.get(`/area`);
      const areaData = response.data?.areas;
      const areaOptions = areaData.map((r) => ({
        label: r.area,
        value: r.pk_area,
      }));
      setAreas(areaOptions);
    } catch (error) {}
  };

  useEffect(() => {
    getArea();
  }, []);

  const handleChange = (e) => {
    setSelectedArea(e.value);
    props?.onSelect(e.value);
  };

  const selectedAreaTemplate = (option, props) => {
    if (option) {
      return <span>{option.label}</span>;
    }
    return <span>{props.placeholder}</span>;
  };

  const areaOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedArea || props?.name}
        onChange={handleChange}
        options={areas}
        optionLabel="label"
        placeholder="Seleccione el área"
        className="w-full md:w-20rem"
        filter
        valueTemplate={selectedAreaTemplate}
        itemTemplate={areaOptionTemplate}
      />
    </div>
  );
};

export default InputOptionArea;
