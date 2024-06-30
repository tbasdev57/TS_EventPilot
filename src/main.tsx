import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "../Store/store.tsx";
import { Provider } from "react-redux";

import IndividualVolunteer from "./components/Volunteer/IndividualVolunteer.tsx";
import EventManagement from "./components/eventManagement/EventView.tsx";
import IndividualEvent from "./components/eventManagement/IndividualEvent.tsx";
import SummaryPage from "./components/eventManagement/SummaryPage.tsx";
import VolunteerManagement from "./components/Volunteer/VolunteerManagement.tsx";
import App from "./App.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/volunteer" element={<VolunteerManagement />} />
          <Route
            path="/volunteer/:volunteerId"
            element={<IndividualVolunteer />}
          />
          <Route path="/event" element={<EventManagement />} />

          <Route path="/event/:eventId" element={<IndividualEvent />} />
              <Route path="/eventsummary" element={<SummaryPage/>} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
