
import React, { useState } from "react";
import { Password } from 'primereact/password';

export default function ToggleMaskDemo() {
    const [password, setPassword] = useState('');

    return (
        <div>
            <Password 
            className="w-full mt-2 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Ingrese su contraseña"
            />
        </div>
    )
}