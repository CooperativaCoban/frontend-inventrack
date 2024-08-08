import { apiSystem } from "@/api";
import { saveRolLocalStorage, saveTokenLocalStorage } from "@/utils/manager";
import { errorModal, successModal } from "../../../utils/Modals";
import { credentials, isLoading, loaded } from "./authSlice";
import Cookies from "js-cookie";

// en la data va venir el correo y la contraseña
export const startLogin = (data1) => {
  return async (dispatch) => {
    //destructuracion de lo que venga en data
    try {
      dispatch(isLoading());
      const { data } = await apiSystem.post("/auth/login", data1);
      saveTokenLocalStorage(data.token);
      Cookies.set("token", data.token, { secure: false });
      saveRolLocalStorage(data.role);
      dispatch(credentials(data));
      successModal("Inicio de sesion");
    } catch (error) {
      dispatch(loaded());
      errorModal(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };
};
