import React from "react";

function InfoBox(prop) {
  return (
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "10%",
        width: "auto",
        height: "auto",
        backgroundColor: "beige",
        padding: "20px",
        display: prop.polyline != null ? "block" : "none",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        borderRadius: "5px",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <b>Travel Mode</b>
        {prop.travelmode === "TRANSIT" ? "PUBLIC TRANSPORT" : prop.travelmode}
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <b>Distance:</b>
        {prop.distance}
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <b>Time:</b>
        {prop.timetake}
      </div>
    </div>
  );
}

export default InfoBox;
