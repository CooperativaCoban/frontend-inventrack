"use client";
import React from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Menu } from "primereact/menu";

const SideBar = (props) => {

 
  const items = [
    {
      label: "Dashboard",
      className: "text text-white",
      icon: "pi pi-th-large",
      url: "/",
    },
    {
      label: "Contabilidad",
      className: "text text-white bg-indigo-900",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Inventario",
          className: "text text-white",
          icon: "pi pi-fw pi-calendar-minus",
          url: "/countInventory"
        },
        {
          label: "Reporte",
          className: "text text-white",
          icon: "pi pi-fw pi-calendar-minus",
          url: "/appoiments",
        },
      ],
    },
    {
      label: "Informática",
      className: "text text-white bg-indigo-900",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Inventario",
          className: "text text-white",
          icon: "pi pi-fw pi-user-plus",
          url: "/comInventory",
        },
        {
          label: "Usuarios",
          className: "text text-white",
          icon: "pi pi-fw pi-user-plus",
          url: "/users",
        },
        {
          label: "Pacientes",
          className: "text text-white ",
          icon: "pi pi-fw pi-user-plus",
          url: "/patients",
        },
      ],
    },
  ];

  return <Menu popup={props?.show} model={items} className="h-screen" />;
};

export default SideBar;
