'use client';

import React from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navbar from "@/components/Navbar";

const menuPage = () => {
    return (
        <div className="w-full h-screen flex flex-col bg-white">
            <Navbar />
            <div className="flex-grow flex items-center justify-center bg-white">
                <div
                    className="flex items-center justify-center cursor-pointer w-20 h-20"
                >
                 {/*    <img
                        src='https://mapasdeguatemala.com/wp-content/themes/wp-bootstrap-starter/map_app/image/adds/Cooperativa%20Cob%C3%A1n.png'
                        alt="Cooperativa Cobán Logo"
                        className="w-16 h-16"
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default menuPage;
