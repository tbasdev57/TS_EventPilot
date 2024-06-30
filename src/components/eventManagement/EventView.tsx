import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddEvent, deleteEvent, fetchEvents } from "./EventSlice";
import { Link } from "react-router-dom";
import AppDashboard from "../Dashboad";

type Props = {};
export type EventType = {
  _id?: string;
  name: string;
  date: string;
  location: string;
  description: string;
  requiredVolunteers: number;
};

const buttonStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

const deleteButtonStyle = {
  backgroundColor: "#FF0000",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const cardStyle = {
  backgroundColor: "black",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "300px",
  margin: "10px",
};

function EventManagement({}: Props) {
  const dispatch = useDispatch<any>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<EventType>({
    name: "",
    date: "",
    location: "",
    description: "",
    requiredVolunteers: 0,
  });
  const {status,  events } = useSelector((state: any) => state.event);
  const [eventArray, setEventArray] = useState<EventType[]>([]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);


    useEffect(() => {
  setEventArray([...events])

  }, [events]);


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  const handleAddEvent = () => {
    // Check if any of the required fields are empty
    if (
      newEvent.name === "" ||
      newEvent.date === "" ||
      newEvent.location === "" ||
      newEvent.description === "" ||
      newEvent.requiredVolunteers === null
    ) {
      alert("Please fill in all the fields.");
    } else {
      // All required fields are filled, dispatch the action
      dispatch(AddEvent(newEvent));
      setModalOpen(false);
    }
  };

  return (
    <div>

    <AppDashboard/>
      <h1>Event Management</h1>
      <button onClick={openModal}>Add Event</button>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "black",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h2>Add Event</h2>
            <label>Event Name:</label>
            <input
              type="text"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
            />
            <label>Date:</label>
            <input
              type="text"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
            <label>Location:</label>
            <input
              type="text"
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
            />
            <label>Description:</label>
            <input
              type="text"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <label>Volunteers Required:</label>
            <input
              type="number"
              value={newEvent.requiredVolunteers}
              onChange={(e) => {
                setNewEvent({
                  ...newEvent,
                  requiredVolunteers: parseInt(e.target.value),
                });
              }}
            />

            <button onClick={handleAddEvent} style={buttonStyle}>
              Add Event
            </button>
            <button onClick={closeModal} style={deleteButtonStyle}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {status==="loading"  && <h1>event data is loading</h1>}
        {eventArray.map((event: EventType, index: number) => (
          <div key={index} style={cardStyle}>
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Description: {event.description}</p>
            <p>Volunteers Required:{event.requiredVolunteers}</p>

            <Link to={`/event/${event._id}`}>
              <button style={buttonStyle}>View Event</button>
            </Link>
            <button
              style={deleteButtonStyle}
              onClick={() => {
           
                dispatch(deleteEvent(event._id));
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventManagement;
