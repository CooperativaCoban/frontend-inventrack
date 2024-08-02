'use client'
import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';


const InputDate = (props) => {
 

    const [datetime24h, setDateTime24h] = useState(null);

    const handleDateChange = (e) => {
        if (e.value) {
            // Realizar acciones con la fecha seleccionada
            setDateTime24h(e.value);
        } else {
            // Mostrar un mensaje de error o realizar otra acción de validación
            alert("Por favor, seleccione una fecha y hora.");
        }
    };
  

    return (
        <div className="card flex flex-wrap gap-3 p-fluid">
            <div className="flex-auto">
                <Calendar {...props} />
            </div>
        </div>
    )
}
        
export default InputDate;