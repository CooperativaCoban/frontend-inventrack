import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function InputOptionInventoryCom(props) {
    const [selectedProductCom, setSelectedProductCom] = useState(null);
    const [productsCom, setProductsCom] = useState([]);

    const getProductCom = async () => {
        try {
            const response = await apiSystem.get(`/comInventory`);
            const productComData = response.data?.comInventorys;
            const productComNames = productComData.map((r) => ({
                key: r.pk_cominventory,
                label: r.item,
            }));
            setProductsCom(productComNames);
        } catch (error) {
            console.error("Error fetching inventory count products:", error);
        }
    };

    useEffect(() => {
        getProductCom();
    }, []);

    const selectedProductTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.label}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };

    const productOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.label}</div>
            </div>
        );
    };

    const handleChange = (e) => {
        setSelectedProductCom(e.value);
        props?.onSelect(e.value?.key);
    };

    return (
        <div className="card flex justify-content-center">
            <Dropdown 
                value={selectedProductCom} 
                onChange={handleChange} 
                options={productsCom} 
                optionLabel="label" 
                placeholder="Seleccione un producto"
                filter 
                valueTemplate={selectedProductTemplate} 
                itemTemplate={productOptionTemplate} 
                className="w-full md:w-14rem" 
            />
        </div>
    );
}
