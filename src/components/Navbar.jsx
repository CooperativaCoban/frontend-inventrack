import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import CustomSidebar from "@/components/SideBar";
import HeadlessDemo from "@/components/SideBar"; // Asegúrate de importar correctamente tu componente CustomSidebar

export default function TemplateDemo() {
    const [visible, setVisible] = useState(false);

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const items = [];

    const start = (
        <div onClick={() => setVisible(!visible)} style={{ cursor: 'pointer' }}>
            <img 
                src='https://mapasdeguatemala.com/wp-content/themes/wp-bootstrap-starter/map_app/image/adds/Cooperativa%20Cob%C3%A1n.png'  
                width="175" 
                height="300" 
            />
        </div>
    );

    const end = (
        <div className="flex align-items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );

    return (
        <div className="card relative">
            <Menubar model={items} start={start} end={end} />
            <CustomSidebar 
                visible={visible} // Pasar el estado de visibilidad al CustomSidebar
                onHide={() => setVisible(false)} // Cambia el estado a false para ocultar el CustomSidebar
            />
        </div>
    );
}
