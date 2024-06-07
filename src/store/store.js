import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/auth/authSlice";
/* import { userSlice } from "./slice/user/userSlice";
import { formTypeSlice } from "./slice/formType/formTypeSlice";
import { checkerSlice } from "./slice/checker/checkerSlice";
import { userAssociateSlice } from "./slice/userAssociate/userAssociateSlice";
import { userAssociateIndividualSlice } from "./slice/userAssociate/userAssociateIndividualSlice";
 */
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    /* user: userSlice.reducer,
    formType: formTypeSlice.reducer,
    checker: checkerSlice.reducer,
    userAssociate: userAssociateSlice.reducer,
    userAssociateIndividual: userAssociateIndividualSlice.reducer, */
  },
});
