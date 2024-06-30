import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateEventDetails } from "./EventSlice";
import { EventType } from "./EventView";
import {Link}from "react-router-dom"
import AppDashboard from "../Dashboad";


type Props = {};

const eventDetailsStyle = {
  backgroundColor: "black",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  margin: "20px auto",
  maxWidth: "500px",
};

const editButtonStyle = {
  backgroundColor: "gray",
  padding: "1rem",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

const editFormStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "black",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  margin: "20px",
  maxWidth: "300px",
};

function IndividualEvent({}: Props) {
  const dispatch = useDispatch<any>();
  const { eventId } = useParams();

  const { events } = useSelector((state: any) => state.event);

  const clickedEvent = events.find((event:EventType) => event._id === eventId);

  const [isEditing, setIsEditing] = useState(false);

  if (!clickedEvent) {
    return <div>Loading...</div>;
  }

  const [editedEvent, setEditedEvent] = useState<EventType>({ ...clickedEvent });

  // Function to update the event details
  const handleUpdateEventDetails = () => {
    dispatch(updateEventDetails({ id: eventId, updateData: editedEvent }));
    setIsEditing(false);
  };

  return (
    <div style={eventDetailsStyle}>

              <AppDashboard />
      {clickedEvent && (
        <>
          <h2 style={{ color: "lightgreen" }}>INDIVIDUAL EVENT DETAILS</h2>
          <h2>Details for Event: {clickedEvent.name}</h2>
          <p>Event Name: {clickedEvent.name}</p>
          <p>Date: {clickedEvent.date}</p>
          <p>Location: {clickedEvent.location}</p>
          <p>Description: {clickedEvent.description}</p>
          <p>Volunteers Required: {clickedEvent.requiredVolunteers}</p>
        </>
      )}

      {isEditing ? (
        <div style={editFormStyle}>
          <h3 style={{ color: "red" }}>Edit Event Details</h3>
          <form>
            <div>
              <label>Event Name:</label>
              <input
                type="text"
                value={editedEvent.name}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="text"
                value={editedEvent.date}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, date: e.target.value })
                }
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                value={editedEvent.location}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, location: e.target.value })
                }
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={editedEvent.description}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, description: e.target.value })
                }
              />
            </div>
            <div>
              <label>Volunteers Required:</label>
              <input
                type="number"
                value={editedEvent.requiredVolunteers}
                onChange={(e) =>
                  setEditedEvent({
                    ...editedEvent,
                    requiredVolunteers: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <button onClick={handleUpdateEventDetails}>Update and Save</button>
            <button
              style={{ margin: ".4rem", textAlign: "center" }}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <button
          style={editButtonStyle}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      )}  <Link to={`/eventsummary/${eventId}`}>
            <button style={editButtonStyle}>View Summary</button>
          </Link>

      
    </div>
  );
}

export default IndividualEvent;
