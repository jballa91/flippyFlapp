import React from "react";

const Marker = () => (
  <div
    style={{
      color: "white",
      background: "red",
      // padding: "15px 10px",
      height: "10px",
      width: "10px",
      borderRadius: "100%",
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      "&:hover": {
        cursor: "pointer",
      },
    }}
  ></div>
);

export default Marker;
