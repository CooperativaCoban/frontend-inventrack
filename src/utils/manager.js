import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

const tokenKey = 'token';
const rolKey = 'role';
const idKey = 'id';

//GUARDAR EN LOCAL STORAGE

// Guarda el token en localStorage
export function saveTokenLocalStorage(token) {
    localStorage.setItem(tokenKey, token);
}

// Guarda el rol en localStorage, encriptándolo primero
export function saveRolLocalStorage(role) {
    let auxRol = CryptoJS.AES.encrypt(role.toString(), 'TYd23@201642').toString();
    localStorage.setItem(rolKey, auxRol);
}

// Guarda el ID en localStorage, encriptándolo primero
export function saveIdLocalStorage(id) {
    let auxId = CryptoJS.AES.encrypt(id.toString(), 'TYd23@201642').toString();
    localStorage.setItem(idKey, auxId);
}

//OBTENER DEL LOCAL STORAGE

// Obtiene el token del localStorage
export function getToken() {
    return localStorage.getItem(tokenKey);
}

// Obtiene el rol encriptado del localStorage
export function getRol() {
    return localStorage.getItem(rolKey);
}

// Obtiene el ID encriptado del localStorage
export function getId() {
    return localStorage.getItem(idKey);
}

//REMOVER DEL LOCAL STORAGE

// Remueve el token del localStorage
export function removeTokenLocalStorage() {
    localStorage.removeItem(tokenKey);
}

// Remueve el rol del localStorage
export function removeRolLocalStorage() {
    localStorage.removeItem(rolKey);
}

// Remueve el ID del localStorage
export function removeIdLocalStorage() {
    localStorage.removeItem(idKey);
}


//DESENCRIPATR DE LOCAL STORAGE

// Desencripta y devuelve el rol
export function decryptRolLocalStorage() {
    const role = getRol();
    if (role === null) return null;
    let bytes = CryptoJS.AES.decrypt(role, 'TYd23@201642');
    let decryptRol = bytes.toString(CryptoJS.enc.Utf8);
    return decryptRol;
}

// Desencripta y devuelve el ID
export function decryptIdLocalStorage() {
    const Id = getId();
    if (Id === null) return null;
    let bytes = CryptoJS.AES.decrypt(Id, 'TYd23@201642');
    let decryptId = bytes.toString(CryptoJS.enc.Utf8);
    return decryptId;
}

//FUNCION PARA CERRAR SESION 

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}

// Función para manejar errores de respuesta

export function interceptorResponse(error) {
    if (error.response.status === 600) {
        Swal.fire({
            icon: 'error',
            title: '¡Sesión vencida!',
            text: 'Tú sesión ha expirado',
            allowOutsideClick: false
        }).then((result) => {
            logout();
            window.location.reload();
        })
    }
}