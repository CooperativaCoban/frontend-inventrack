import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { apiSystem } from "@/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function InputOptionInventoryTh(props) {
    const [selectedProductTh, setSelectedProductTh] = useState(null);
    const [productsTh, setProductsTh] = useState([]);

    const getProductTh = async () => {
        try {
            const response = await apiSystem.get(`/thInventory`);
            const productThData = response.data?.thInventorys;
            const productThNames = productThData.map((r) => ({
                key: r.pk_thinventory,
                label: r.product,
            }));
            setProductsTh(productThNames);
        } catch (error) {
            console.error("Error fetching inventory count products:", error);
        }
    };

    useEffect(() => {
        getProductTh();
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
        setSelectedProductTh(e.value);
        props?.onSelect(e.value?.key);
    };

    return (
        <div className="card flex justify-content-center">
            <Dropdown 
                value={selectedProductTh} 
                onChange={handleChange} 
                options={productsTh} 
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
