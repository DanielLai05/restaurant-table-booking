import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchReservationsByUser = createAsyncThunk(
  "reservations/fetchByUser",
  async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/reservation/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
)

export const createReservation = createAsyncThunk(
  "reservations/createReservation",
  async (reservationData) => {
    const { date, time, numberOfGuest, title, description, fullName, email, phoneNumber, userId } =
      reservationData;

    if (!(date && time && numberOfGuest && title && description && fullName && email && phoneNumber)) {
      throw new Error("Missing required reservation fields");
    }

    const formattedDate = `${date}T${time}+08:00`;

    try {
      const response = await axios.post(`${baseUrl}/reservation`, {
        date: formattedDate,
        number_of_guest: numberOfGuest,
        full_name: fullName,
        email,
        phone_number: phoneNumber,
        description,
        user_id: userId,
        title
      });
      return response.data.details;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const deleteReservaiton = createAsyncThunk(
  "reservations/deleteReservation",
  async (reservationId) => {
    if (!reservationId) {
      throw new Error('Missing reservation id');
    }

    try {
      const response = await axios.delete(`${baseUrl}/reservation/${reservationId}`);
      return response.data.deletedReservation.id;
    } catch (error) {
      console.error(error);
      throw error;
    }

  }
)

export const updateReservation = createAsyncThunk(
  "reservation/updateReservation",
  async (reservationData) => {
    const { id, date, time, numberOfGuest, title, description, fullName, email, phoneNumber } =
      reservationData;

    if (!(date && time && numberOfGuest && title && description && fullName && email && phoneNumber)) {
      throw new Error("Missing required reservation fields");
    }

    const formattedDate = `${date}T${time}+08:00`;

    try {
      const response = await axios.put(`${baseUrl}/reservation`, {
        id,
        date: formattedDate,
        number_of_guest: numberOfGuest,
        full_name: fullName,
        email,
        phone_number: phoneNumber,
        description,
        title
      });
      return response.data.details;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
)

const reservationsSlice = createSlice({
  name: "reservations",
  initialState: {
    reservations: [],
    loading: false,
    success: false,
    error: false,
  },
  reducers: {
    resetReservationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservationsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReservationsByUser.fulfilled, (state, action) => {
        state.error = false;
        state.reservations = action.payload;
        state.loading = false;
      })
      .addCase(fetchReservationsByUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.error = false
        state.success = false;
        if (action.payload) {
          state.reservations.push(action.payload);
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(createReservation.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(deleteReservaiton.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReservaiton.fulfilled, (state, action) => {
        state.error = false;
        const newReservations = state.reservations.filter((reservation) => reservation.id !== action.payload)
        state.reservations = newReservations;
        state.loading = false;
      })
      .addCase(deleteReservaiton.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(updateReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.error = false;
        state.success = false;
        state.reservations = state.reservations.map((reservation) => (
          reservation.id === action.payload.id ? action.payload : reservation
        ))
        state.loading = false;
        state.success = true;
      })
      .addCase(updateReservation.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
  },
});


export const { resetReservationState } = reservationsSlice.actions;
export default reservationsSlice.reducer;
