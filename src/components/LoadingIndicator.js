import React from "react";

const LoadingIndicator = () => (
  <div className="d-flex align-items-center justify-content-center h-100">
    <div
      className="spinner-grow text-secondary"
      style={{ height: 100, width: 100 }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default LoadingIndicator;
