import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EventType } from "./EventView";
import { VolunteerType } from "../Volunteer/VolunteerManagement";
import { fetchVolunteers } from "../Volunteer/VolunteerSlice";
import { fetchEvents } from "./EventSlice";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "2rem",
  textAlign: "center",
};

const tableStyle: React.CSSProperties = {
  border: "1px solid #000",
  marginBottom: "1rem",
};

function SummaryPage() {
  const dispatch = useDispatch<any>();

  const { events, status: eventStatus } = useSelector(
    (state: any) => state.event
  );

  const { volunteers, status: volunteerStatus } = useSelector(
    (state: any) => state.volunteer
  );



  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchVolunteers());
  }, [dispatch]);

  const renderEventSummaries = () => {
    return (
      <div style={tableStyle}>
        <h2>Event Summaries</h2>
        {eventStatus === "loading" && <h4>Loading event summary details </h4>}
        <table style={{ border: "1px solid #000" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #000" }}>Event Name</th>

              <th style={{ border: "1px solid #000" }}>Event details</th>
              <th style={{ border: "1px solid #000" }}>Volunteers list </th>

              <th style={{ border: "1px solid #000" }}>Volunteers roles </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event: EventType, eventIndex: number) => (
              <tr key={event._id} style={{ border: "1px solid #000" }}>
                <td style={{ border: "1px solid #000" }}>{event.name}</td>

                <td style={{ border: "1px solid #000" }}>
                  {event.description}
                </td>
                <td style={{ border: "1px solid #000" }}>
                  {
                    volunteers.find((_:any, i: React.Key) => i === eventIndex)
                      .skills
                  }
                </td>
                <td style={{ border: "1px solid #000" }}>
                  {volunteers.map(
                    (volunteer: VolunteerType) => volunteer.skills
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderVolunteerSummaries = () => {
    return (
      <div style={tableStyle}>
        <h2>Volunteer Summaries</h2>

        {volunteerStatus === "loading" && (
          <h4>Loading event summary details </h4>
        )}
        <table style={{ border: "1px solid #000" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #000" }}>Name</th>
              <th style={{ border: "1px solid #000" }}>Contact</th>
              <th style={{ border: "1px solid #000" }}>Skills</th>
              <th style={{ border: "1px solid #000" }}>Availability</th>
              <th style={{ border: "1px solid #000" }}>Assigned Events</th>
              <th style={{ border: "1px solid #000" }}>Volunteer history</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer: VolunteerType) => (
              <tr
                key={volunteer._id as React.Key}
                style={{ border: "1px solid #000" }}
              >
                <td style={{ border: "1px solid #000" }}>{volunteer.name}</td>
                <td style={{ border: "1px solid #000" }}>
                  {volunteer.contact}
                </td>
                <td style={{ border: "1px solid #000" }}>
                  {volunteer.skills.join(", ")}
                </td>
                <td style={{ border: "1px solid #000" }}>
                  {volunteer.availability ? "Available" : "Not Available"}
                </td>
                <td style={{ border: "1px solid #000" }}>
                  {volunteer.areaOfInterest.join(", ")}
                </td>
                <td style={{ border: "1px solid #000" }}>
                  {volunteer.areaOfInterest.join(",").split(",")[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h1>Summary Page</h1>
      {renderEventSummaries()}
      {renderVolunteerSummaries()}
    </div>
  );
}

export default SummaryPage;
