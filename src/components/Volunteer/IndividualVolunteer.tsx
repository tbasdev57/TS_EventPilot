import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateVolunteerDetails } from "./VolunteerSlice";
import { VolunteerType } from "./VolunteerManagement";
import AppDashboard from "../Dashboad";


type Props = {};

const volunteerDetailsStyle = {
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

function IndividualVolunteer({}: Props) {
  const dispatch = useDispatch<any>();
  const { volunteerId } = useParams();

  const clickedVolunteer = useSelector((state: any) => state.volunteer.volunteers.find((volunteer: any) => volunteer._id === volunteerId));

  const [isEditing, setIsEditing] = useState(false);

  if (!clickedVolunteer) {
    return <div>Loading...</div>;
  }

  const [editedVolunteer, setEditedVolunteer] = useState<VolunteerType>({ ...clickedVolunteer });

  // Function to update the volunteer details
  const handleUpdateVolunteerDetails = () => {
    dispatch(updateVolunteerDetails({ id: volunteerId, updateData: editedVolunteer }));
    setIsEditing(false);
  };

  return (
    <div style={volunteerDetailsStyle}>
            <AppDashboard />
      {clickedVolunteer && (
        <>
          <h2 style={{ color: "lightgreen" }}>INDIVIDUAL VOLUNTEER DETAILS</h2>
          <h2>Details for Volunteer: {clickedVolunteer.name}</h2>
          <p>Name: {clickedVolunteer.name}</p>
          <p>Contact: {clickedVolunteer.contact}</p>
          <p>Skills: {clickedVolunteer.skills.join(", ")}</p>
          <p>Availability: {clickedVolunteer.availability ? "Available" : "Not Available"}</p>
          <p>Area of Interest: {clickedVolunteer.areaOfInterest.join(", ")}</p>
          <p>Events: {clickedVolunteer.event.join(", ")}</p>
        </>
      )}

      {isEditing ? (
        <div style={editFormStyle}>
          <h3 style={{ color: "red" }}>Edit Volunteer Details</h3>
          <form>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={editedVolunteer.name}
                onChange={(e) =>
                  setEditedVolunteer({ ...editedVolunteer, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Contact:</label>
              <input
                type="text"
                value={editedVolunteer.contact}
                onChange={(e) =>
                  setEditedVolunteer({ ...editedVolunteer, contact: e.target.value })
                }
              />
            </div>
            <div>
              <label>Skills (comma-separated):</label>
              <input
                type="text"
                value={editedVolunteer.skills.join(", ")}
                onChange={(e) =>
                  setEditedVolunteer({
                    ...editedVolunteer,
                    skills: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </div>
            <div>
              <label>Availability:</label>
              <input
                type="checkbox"
                checked={editedVolunteer.availability}
                onChange={(e) =>
                  setEditedVolunteer({
                    ...editedVolunteer,
                    availability: e.target.checked,
                  })
                }
              />
            </div>
            <div>
              <label>Area of Interest (comma-separated):</label>
              <input
                type="text"
                value={editedVolunteer.areaOfInterest.join(", ")}
                onChange={(e) =>
                  setEditedVolunteer({
                    ...editedVolunteer,
                    areaOfInterest: e.target.value.split(",").map((interest) => interest.trim()),
                  })
                }
              />
            </div>
            <div>
              <label>Events (comma-separated):</label>
              <input
                type="text"
                value={editedVolunteer.event.join(", ")}
                onChange={(e) =>
                  setEditedVolunteer({
                    ...editedVolunteer,
                    event: e.target.value.split(",").map((event) => event.trim()),
                  })
                }
              />
            </div>
            <button onClick={handleUpdateVolunteerDetails}>
              Update and Save
            </button>
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
      )}
    </div>
  );
}

export default IndividualVolunteer;
