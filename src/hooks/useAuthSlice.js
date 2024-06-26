import { useDispatch, useSelector } from 'react-redux';
import { logout, startLogin } from '@/store/slice/auth';

export const useAuthSlice = () => {
  const dispatch = useDispatch();
  const { token, role, loading } = useSelector((state) => state.auth);

  const inicioSesion = (data) => {
    dispatch(startLogin(data));
  };
  
  const cierreSesion = () => {
    dispatch(logout());
  };

  return {
    token,
    role,
    loading,
    inicioSesion,
    cierreSesion,
  };
};