"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const InputOption = (props) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      const response = await apiSystem.get(`/user`);
      const userData = response.data?.users;
      const userOptions = userData.map((r) => ({
        label: r.name_user,  // Nombre del usuario
        value: r.pk_user,    // ID del usuario
      }));
      setUsers(userOptions);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    setSelectedUser(e.value);
    props?.onSelect(e.value);
  };

  const selectedUserTemplate = (option, props) => {
    if (option) {
      return <span>{option.label}</span>;
    }
    return <span>{props.placeholder}</span>;
  };

  const userOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedUser || props?.name}
        onChange={handleChange}
        options={users}
        optionLabel="label"
        placeholder="Seleccione al usuario"
        className="w-full md:w-20rem"
        filter
        valueTemplate={selectedUserTemplate}
        itemTemplate={userOptionTemplate}
      />
    </div>
  );
};

export default InputOption;
