"use client"
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';


export default function TemplateDemo() {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

   
    const start =
        <div className="" url = "/" >
            <img
                src='https://mapasdeguatemala.com/wp-content/themes/wp-bootstrap-starter/map_app/image/adds/Cooperativa%20Cob%C3%A1n.png'
                width="175"
                height="300"
                
            />

        </div>

    const end = (
        <div className="flex align-items-center gap-2">
           {/*  <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> */}
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );

    return (
        
            <Menubar  start={start} end={end} />
    
    )
}