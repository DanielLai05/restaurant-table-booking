import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'http://localhost:3000';

export const fetchReservationsByUser = createAsyncThunk(
  "reservations/fetchByUser",
  async (userId) => {
    try {
      const response = await axios.post(`${baseUrl}/reservation/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
)

const reservationsSlice = createSlice({
  name: "reservation",
  initialState: {
    reservations: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservationsByUser.fulfilled, (state, action) => {
        state.reservations = action.payload;
      })
  }
})


export default reservationsSlice.reducer;
