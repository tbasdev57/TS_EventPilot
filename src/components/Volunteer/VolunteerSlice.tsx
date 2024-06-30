import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { VolunteerType } from "./VolunteerManagement";

const initialState = {
  volunteers: [] as VolunteerType[],
  status: "idle",
  error: null as null | string,
  errorMesage: "",
};

export const AddVolunteer: AsyncThunk<any, any, any> = createAsyncThunk(
  "volunteers/addVolunteer",
  async (postData) => {
    const response = await axios.post(
      "https://eventvolunteer-management.professssor.repl.co/volunteer",
      postData
    );

    return response.data.data;
  }
);

export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async () => {
    const response = await axios.get(
      "https://eventvolunteer-management.professssor.repl.co/volunteer"
    );
    return response.data.data;
  }
);

export const deleteVolunteers: AsyncThunk<any, any, any> = createAsyncThunk(
  "volunteers/deleteVolunteers",
  async (id) => {
    const response = await axios.delete(
      "https://eventvolunteer-management.professssor.repl.co/volunteer",
      { data: { id: id } }
    );

    return response.data.data;
  }
);

export const updateVolunteerDetails: AsyncThunk<any, any, any> =
  createAsyncThunk(
    "volunteers/updateVolunteerDetails",
    async ({ id, updateData }) => {
      const response = await axios.put(
        `https://eventvolunteer-management.professssor.repl.co/volunteer/${id}`,
        updateData
      );
      return response.data.data;
    }
  );

export const VolunteerSlice = createSlice({
  name: "volunteer",
  initialState,

  reducers: {},
  // for Adding a new volunteer to the list
  extraReducers: (builder) => {
    builder.addCase(AddVolunteer.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(AddVolunteer.fulfilled, (state, action) => {
      state.status = "success";
      state.volunteers.push(action.payload);
    });

    builder.addCase(AddVolunteer.rejected, (state, action) => {
      state.status = "failure";
      state.error = (action.error as Error).message;
    });

    // for fetching the volunteers
    builder.addCase(fetchVolunteers.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchVolunteers.fulfilled, (state, action) => {
      state.status = "success";
      state.volunteers = action.payload;
    });

    builder.addCase(fetchVolunteers.rejected, (state, action) => {
      state.status = "failure";
      state.error = (action.error as Error).message;
    });

    //for deleting the volunteers
    builder.addCase(deleteVolunteers.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(deleteVolunteers.fulfilled, (state, action) => {
      state.status = "success";
      state.volunteers = state.volunteers.filter(
        (volunteers) => volunteers._id !== action.payload._id
      );
    });

    builder.addCase(deleteVolunteers.rejected, (state, action) => {
      state.status = "failure";
      state.error = (action.error as Error).message;
    });

    //for updating the details of volunteers

    builder.addCase(updateVolunteerDetails.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(updateVolunteerDetails.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.volunteers.findIndex(
        (volunteer) => volunteer._id === action.payload._id
      );
      state.volunteers[index] = action.payload;
    });

    builder.addCase(updateVolunteerDetails.rejected, (state, action) => {
      state.status = "failure";
      state.error = (action.error as Error).message;
    });
  },
});

export default VolunteerSlice.reducer;
