"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InputOptionCollaborator = (props) => {
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [collaborators, setCollaborators] = useState([]);

  const getCollaborator = async () => {
    try {
      const response = await apiSystem.get(`/collaborator`);
      const collaboratorsData = response.data?.collaborators;
      const collaboratorOptions = collaboratorsData.map((r) => ({
        label: r.name,
        value: r.pk_collaborator,
      }));
      setCollaborators(collaboratorOptions);
    } catch (error) {}
  };

  useEffect(() => {
    getCollaborator();
  }, []);

  const handleChange = (e) => {
    setSelectedCollaborator(e.value);
    props?.onSelect(e.value);
  };

  const selectedCollaboratorTemplate = (option, props) => {
    if (option) {
      return <span>{option.label}</span>;
    }
    return <span>{props.placeholder}</span>;
  };

  const collaboratorOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedCollaborator || props?.name}
        onChange={handleChange}
        options={collaborators}
        optionLabel="label"
        placeholder="Seleccione al colaborador"
        className="w-full md:w-20rem"
        filter
        valueTemplate={selectedCollaboratorTemplate}
        itemTemplate={collaboratorOptionTemplate}
      />
    </div>
  );
};

export default InputOptionCollaborator;
