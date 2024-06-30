import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddVolunteer,
  deleteVolunteers,
  fetchVolunteers,
} from "./VolunteerSlice";
import { Link } from "react-router-dom";
import AppDashboard from "../Dashboad";

type Props = {};
export type VolunteerType = {
  _id?: String;
  name: string;
  contact: string;
  skills: string[];
  availability: boolean;
  areaOfInterest: string[];
  event: string[];
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

function VolunteerManagement({}: Props) {
  const dispatch = useDispatch<any>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState<VolunteerType>({
    name: "",
    contact: "",
    skills: [],
    availability: false,
    areaOfInterest: [],
    event: [],
  });
  const { volunteers, status } = useSelector((state: any) => state.volunteer);

  useEffect(() => {
    dispatch(fetchVolunteers());
  }, [dispatch]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddVolunteer = () => {
    // Check if any of the required fields are empty
    if (
      newVolunteer.name === "" ||
      newVolunteer.contact === "" ||
      newVolunteer.skills.length === 0 ||
      newVolunteer.areaOfInterest.length === 0 ||
      newVolunteer.event.length === 0
    ) {
      alert("Please fill in all the fields.");
    } else {
      // All required fields are filled, dispatch the action
      dispatch(AddVolunteer(newVolunteer));
      setModalOpen(false);
    }
  };

  return (
    <div>
      {" "}
      <AppDashboard />
      <h1>Volunteer Management</h1>
      {status === "loading" && <h3>volunteer data is loading</h3>}
      <button onClick={openModal}>Add Volunteer</button>
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
            <h2>Add Volunteer</h2>
            <label>Name:</label>
            <input
              type="text"
              value={newVolunteer.name}
              onChange={(e) =>
                setNewVolunteer({ ...newVolunteer, name: e.target.value })
              }
            />
            <label>Contact Information:</label>
            <input
              type="text"
              value={newVolunteer.contact}
              onChange={(e) =>
                setNewVolunteer({ ...newVolunteer, contact: e.target.value })
              }
            />
            <label>Skills (comma-separated):</label>
            <input
              type="text"
              value={newVolunteer.skills.join(", ")}
              onChange={(e) =>
                setNewVolunteer({
                  ...newVolunteer,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
            />

            <label>Availability:</label>
            <input
              type="checkbox"
              checked={newVolunteer.availability}
              onChange={(e) =>
                setNewVolunteer({
                  ...newVolunteer,
                  availability: e.target.checked,
                })
              }
            />

            <label>Area of Interest (comma-separated):</label>
            <input
              type="text"
              value={newVolunteer.areaOfInterest.join(", ")}
              onChange={(e) =>
                setNewVolunteer({
                  ...newVolunteer,
                  areaOfInterest: e.target.value
                    .split(",")
                    .map((interest) => interest.trim()),
                })
              }
            />

            <label>Events (comma-separated):</label>
            <input
              type="text"
              value={newVolunteer.event.join(", ")}
              onChange={(e) =>
                setNewVolunteer({
                  ...newVolunteer,
                  event: e.target.value.split(",").map((event) => event.trim()),
                })
              }
            />

            <button onClick={handleAddVolunteer} style={buttonStyle}>
              Add
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
        {volunteers.map((volunteer: VolunteerType, index: number) => (
          <div key={index} style={cardStyle}>
            <h3>{volunteer.name}</h3>
            <p>Contact: {volunteer.contact}</p>
            <p>Skills: {volunteer.skills.join(", ")}</p>
            <p>
              Availability:{" "}
              {volunteer.availability ? "Available" : "Not Available"}
            </p>
            <p>Area of Interest: {volunteer.areaOfInterest.join(", ")}</p>
            <p>Events: {volunteer.event.join(", ")}</p>

            <Link to={`/volunteer/${volunteer._id}`}>
              <button style={buttonStyle}>View Volunteer</button>
            </Link>
            <button
              style={deleteButtonStyle}
              onClick={() => {
                console.log("delte clicked");
                dispatch(deleteVolunteers(volunteer._id));
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

export default VolunteerManagement;
