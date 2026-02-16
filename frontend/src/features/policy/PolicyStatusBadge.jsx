import React from "react";

export default function PolicyStatusBadge({ status }) {
  const colors = {
    Draft: "gray",
    Submitted: "blue",
    UnderwritingReview: "orange",
    Approved: "green",
    Rejected: "red",
    Active: "green"
  };

  return (
    <span style={{
      padding: "4px 8px",
      borderRadius: "4px",
      background: colors[status] || "gray",
      color: "white"
    }}>
      {status}
    </span>
  );
}