import 'primeflex/primeflex.css';
import React, { useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { Link } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const CustomSidebar = ({ visible, onHide }) => {
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);
    const btnRef5 = useRef(null);
    const btnRef6 = useRef(null);
    const btnRef7 = useRef(null);
    const btnRef8 = useRef(null);
    const btnRef9 = useRef(null);


    return (
        <Sidebar visible={visible} onHide={onHide}
        >
            <div className="min-h-screen flex relative lg:static surface-ground">
                <div id="app-sidebar-2" className="" style={{ width: '350px' }}>
                    <div className="flex flex-col h-full bg-white">
                        {/* PRIMER DIV DEL USUARIO */}
                        <div className="mt-20">
                            <img
                                src='https://mapasdeguatemala.com/wp-content/themes/wp-bootstrap-starter/map_app/image/adds/Cooperativa%20Cob%C3%A1n.png'
                                width="300"
                                height="300"
                            />
                            <hr className="mb-9 mx-9 border-top-1 border-none surface-border" />
                        </div>
                        {/* Segundo div en el medio */}
                        <div className="overflow-y-auto flex-grow">
                            <div className="overflow-y-auto">
                                <ul className="list-none p-3 m-0">
                                    <li>
                                        <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                            <div ref={btnRef1} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                                                <span className="font-medium">MENU</span>
                                                <i className="pi pi-chevron-down"></i>
                                                <Ripple />
                                            </div>
                                        </StyleClass>
                                        <ul className="list-none p-0 m-0 overflow-hidden">
                                            <li>
                                                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                    <i className="pi pi-bookmark mr-2"></i>
                                                    <span className="font-medium">Dashboard</span>
                                                    <Ripple />
                                                </a>
                                            </li>
                                            <li>
                                                <StyleClass nodeRef={btnRef2} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                    <a ref={btnRef2} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-users mr-2"></i>
                                                        <span className="font-medium">Contabilidad</span>
                                                        <i className="pi pi-chevron-down ml-auto mr-1"></i>
                                                        <Ripple />
                                                    </a>
                                                </StyleClass>
                                                <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                                    <li>
                                                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                            <i className="pi pi-bookmark mr-2"></i>
                                                            <span className="font-medium">Iventario</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <StyleClass nodeRef={btnRef3} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                            <a ref={btnRef3} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                                <i className="pi pi-chart-line mr-2"></i>
                                                                <span className="font-medium">Reportes</span>
                                                                <i className="pi pi-chevron-down ml-auto mr-1"></i>
                                                                <Ripple />
                                                            </a>
                                                        </StyleClass>
                                                        <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                                            <li>
                                                                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                                    <i className="pi pi-chart-bar mr-2"></i>
                                                                    <span className="font-medium">Listado de entrega</span>
                                                                    <Ripple />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                                    <i className="pi pi-chart-bar mr-2"></i>
                                                                    <span className="font-medium">Contable</span>
                                                                    <Ripple />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>

                                                </ul>
                                            </li>
                                            <li>
                                                <StyleClass nodeRef={btnRef4} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                    <a ref={btnRef4} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-users mr-2"></i>
                                                        <span className="font-medium">Informática</span>
                                                        <i className="pi pi-chevron-down ml-auto mr-1"></i>
                                                        <Ripple />
                                                    </a>
                                                </StyleClass>
                                                <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                                    <li>
                                                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                            <i className="pi pi-bookmark mr-2"></i>
                                                            <span className="font-medium">Inventario</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                    <li>

                                                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                            <i className="pi pi-chart-line mr-2"></i>
                                                            <span className="font-medium">Reporte</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>

                                                </ul>
                                            </li>

                                            <li>
                                                <StyleClass nodeRef={btnRef8} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                    <a ref={btnRef8} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-users mr-2"></i>
                                                        <span className="font-medium">Talento Humano</span>
                                                        <i className="pi pi-chevron-down ml-auto mr-1"></i>
                                                        <Ripple />
                                                    </a>
                                                </StyleClass>
                                                <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                                    <li>
                                                    </li>
                                                    <li>
                                                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                            <i className="pi pi-bookmark mr-2"></i>
                                                            <span className="font-medium">Inventario</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                            <i className="pi pi-chart-line mr-2"></i>
                                                            <span className="font-medium">Reporte</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <StyleClass nodeRef={btnRef9} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                    <a ref={btnRef9} className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-users mr-2"></i>
                                                        <span className="font-medium">Usuarios</span>
                                                        <i className="pi pi-chevron-down ml-auto mr-1"></i>
                                                        <Ripple />
                                                    </a>
                                                </StyleClass>
                                                <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                                                    <li>
                                                    </li>
                                                    <li>
                                                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                            <i className="pi pi-users mr-2"></i>
                                                            <span className="font-medium">Roles</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                            <i className="pi pi-users mr-2"></i>
                                                            <span className="font-medium">Usuario</span>
                                                            <Ripple />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="list-none py-28 m-0">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default CustomSidebar;
