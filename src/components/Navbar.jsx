"use client"

import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


export default function TemplateDemo(props) {
    const router = useRouter();
    const logout = () => {
        Cookies.remove("token");
        router.push("/login");
    };


    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );


    const start =
        <div className="" url="/" >
            <img
                src='https://mapasdeguatemala.com/wp-content/themes/wp-bootstrap-starter/map_app/image/adds/Cooperativa%20Cob%C3%A1n.png'
                width="175"
                height="300"

            />

        </div>

    const end = (
        <div className="flex align-items-center gap-2">
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a onClick={logout}>Cerrar Sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );

    return (

        <Menubar start={start} end={end} />

    )
}