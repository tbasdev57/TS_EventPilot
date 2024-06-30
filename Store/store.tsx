import { configureStore } from '@reduxjs/toolkit';
import VolunteerSlice from "../src/components/Volunteer/VolunteerSlice"
import EventSlice from '../src/components/eventManagement/EventSlice';

const store = configureStore({
  reducer: {
  volunteer:VolunteerSlice,
  event:EventSlice
  }, 
});



export default store;