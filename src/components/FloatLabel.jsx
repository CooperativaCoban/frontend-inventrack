
import React from 'react'; 
import { InputText } from "primereact/inputtext";

export default function FloatLabel() {
    return (
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="username">Username</label>
                <InputText id="username" aria-describedby="username-help" />
                <small id="username-help">
                    Ingrese su nombre de usuario.
                </small>
            </div>
        </div>
    )
}
        