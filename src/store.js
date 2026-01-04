import { configureStore } from "@reduxjs/toolkit";
import reservationReducer from "./features/reservation/reservationsSlice";

export default configureStore({
  reducer: {
    reservations: reservationReducer,
  },
})