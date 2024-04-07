import React from "react";

const dashboard = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        gap:"2rem",
        alignItems: "center",
      }}
    >
      <h1 style={{fontSize:"2rem", fontWeight:"bold", display: "block"}}>Welcome</h1>
      <h6>To the Admin dashboard</h6>
    </div>
  );
};

export default dashboard;
