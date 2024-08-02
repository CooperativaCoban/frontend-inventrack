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
      url: "/menu",
    },
    {
      label: "Contabilidad",
      className: "text bg-indigo-900",
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
          url: "/countReport",
        },
      ],
    },
    {
      label: "Informática",
      className: "text bg-indigo-900",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Inventario",
          className: "text text-white",
          icon: "pi pi-fw pi-calendar-minus",
          url: "/comInventory"
        },
        {
          label: "Reporte",
          className: "text text-white",
          icon: "pi pi-fw pi-calendar-minus",
          url: "/comReport",
        },
      ],
    },
    {
      label: "Talento Humano",
      className: "text bg-indigo-900",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Inventario",
          className: "text text-white",
          icon: "pi pi-fw pi-calendar-minus",
          url: "/thInventory"
        },
        {
          label: "Reporte",
          className: "text text-white",
          icon: "pi pi-fw pi-calendar-minus",
          url: "/thReport",
        },
      ],
    },
    {
      label: "Usuarios",
      className: "text bg-indigo-900",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Usuario",
          className: "text text-white",
          icon: "pi pi-fw pi-calendar-minus",
          url: "/users"
        },
        {
          label: "Roles",
          className: "text text-white",
          icon: "pi pi-fw pi-calendar-minus",
          url: "/roles"
        },
      ],
    },
  ];

  return <Menu popup={props?.show} model={items} className="h-screen" />;
};

export default SideBar;
