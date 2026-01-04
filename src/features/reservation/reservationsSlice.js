import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'http://localhost:3000';

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

const reservationsSlice = createSlice({
  name: "reservations",
  initialState: {
    reservations: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservationsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReservationsByUser.fulfilled, (state, action) => {
        state.reservations = action.payload;
        state.loading = false;
      })
      .addCase(fetchReservationsByUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        if (action.payload) {
          state.reservations.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(createReservation.rejected, (state) => {
        state.loading = false;
      })
  },
});



export default reservationsSlice.reducer;
