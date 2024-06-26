import Swal from "sweetalert2"

export const successModal = (text, position1 = 'center') => {
    Swal.fire({
        position: position1,
        icon: 'success',
        title: text,
        showConfirmButton: false,
        timer: 1500
    })
}

export const errorModal = (textError) => {
    Swal.fire({
        icon: 'error',
        text: textError,
        showConfirmButton: true,
        timer: 30000
    })
}

export const questionModal = (title, mensaje, funcion) => {
    Swal.fire({
        title: title,
        text: mensaje,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
    }).then((result) => {
        if (result.isConfirmed) {
            funcion();
        }
    })
}
