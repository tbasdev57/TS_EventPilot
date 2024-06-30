import React from "react";
import { Link } from "react-router-dom";

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "blue",
  color: "white",
  borderRadius: "5px",
  textDecoration: "none",
  textAlign: "center",
  margin: "4px",
};

function AppDashboard() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>App Dashboard</h2>
      <div style={{display:"flex", flexWrap:"wrap", width:"100%", justifyContent:'center'}}>
        <Link to="/volunteer" style={buttonStyle}>
          View Volunteers
        </Link>
        <Link to="/event" style={buttonStyle}>
          View Events
        </Link>
        <Link to="/eventsummary" style={buttonStyle}>
          View Event Summary
        </Link>
        <a
          href="https://github.com/professssor/event-volunteer-management-typescript-redux-vite-nodejs"
          style={{ ...buttonStyle, background: "green" }}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default AppDashboard;
