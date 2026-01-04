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
      });
  },
});



export default reservationsSlice.reducer;
