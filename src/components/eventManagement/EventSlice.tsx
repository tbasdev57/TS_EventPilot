import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { EventType } from "./EventView";


const initialState = {
  events: [] as EventType[],
  status: "idle",
  error: null as null | string,
  errorMessage: "",
};

export const AddEvent: AsyncThunk<any, any, any> = createAsyncThunk(
  "events/addEvent",
  async (postData) => {

    const response = await axios.post(
      "https://eventvolunteer-management.professssor.repl.co/event",
      postData
    );

    

    return response.data.data;
  }
);

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get(
    "https://eventvolunteer-management.professssor.repl.co/event"
  );
  return response.data.data;
});

export const deleteEvent: AsyncThunk<any, any, any> = createAsyncThunk(
  "events/deleteEvent",
  async (id) => {
    const response = await axios.delete(
      "https://eventvolunteer-management.professssor.repl.co/event",
      { data: { id: id } }
    );
    return response.data.data;
  }
);

export const updateEventDetails: AsyncThunk<any, any, any> = createAsyncThunk(
  "events/updateEventDetails",
  async ({ id, updateData }) => {
    const response = await axios.put(
      `https://eventvolunteer-management.professssor.repl.co/event/${id}`,
      updateData
    );
    return response.data.data;
  }
);

export const EventSlice = createSlice({
  name: "event",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddEvent.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(AddEvent.fulfilled, (state, action) => {
      state.status = "success";
      state.events.push(action.payload);
    });

    builder.addCase(AddEvent.rejected, (state, action) => {
      state.status = "failure";
      state.error = (action.error as Error).message;
    });

    builder.addCase(fetchEvents.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.status = "success";
      state.events = action.payload;
    });

    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.status = "failure";
      state.error = (action.error as Error).message;
    });

    builder.addCase(deleteEvent.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.status = "success";
      state.events = state.events.filter(
        (event) => event._id !== action.payload._id
      );
    });

    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.status = "failure";
      state.error = (action.error as Error).message;
    });

    builder.addCase(updateEventDetails.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(updateEventDetails.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.events.findIndex(
        (event) => event._id === action.payload._id
      );
      state.events[index] = action.payload;
    });

    builder.addCase(updateEventDetails.rejected, (state, action) => {
      state.status = "failure";
      state.error = (action.error as Error).message;
    });
  },
});

export default EventSlice.reducer;
