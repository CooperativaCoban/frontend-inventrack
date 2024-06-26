import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

const tokenKey = 'token';
const rolKey = 'role';
const idKey = 'id';

//GUARDAR EN LOCAL STORAGE
export function saveTokenLocalStorage(token) {
    localStorage.setItem(tokenKey, token);
}

export function saveRolLocalStorage(role) {
    let auxRol = CryptoJS.AES.encrypt(role.toString(), 'TYd23@201642').toString();
    localStorage.setItem(rolKey, auxRol);
}

export function saveIdLocalStorage(id) {
    let auxId = CryptoJS.AES.encrypt(id.toString(), 'TYd23@201642').toString();
    localStorage.setItem(idKey, auxId);
}

//OBTENER DEL LOCAL STORAGE
export function getToken() {
    return localStorage.getItem(tokenKey);
}

export function getRol() {
    return localStorage.getItem(rolKey);
}

export function getId() {
    return localStorage.getItem(idKey);
}


//REMOVER DEL LOCAL STORAGE
export function removeTokenLocalStorage() {
    localStorage.removeItem(tokenKey);
}

export function removeRolLocalStorage() {
    localStorage.removeItem(rolKey);
}

export function removeIdLocalStorage() {
    localStorage.removeItem(idKey);
}


//DESENCRIPATR DE LOCAL STORAGE
export function decryptRolLocalStorage() {
    const role = getRol();
    if (role === null) return null;
    let bytes = CryptoJS.AES.decrypt(role, 'TYd23@201642');
    let decryptRol = bytes.toString(CryptoJS.enc.Utf8);
    return decryptRol;
}

export function decryptIdLocalStorage() {
    const Id = getId();
    if (Id === null) return null;
    let bytes = CryptoJS.AES.decrypt(Id, 'TYd23@201642');
    let decryptId = bytes.toString(CryptoJS.enc.Utf8);
    return decryptId;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}

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