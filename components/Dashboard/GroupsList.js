import React, { useState, useEffect } from "react";
import axios from "axios";

const GroupsList = () => {
  const [groupsList, setGroupsList] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/group/all`)
      .then((response) => {
        setGroupsList(response.data);
        console.log("groups: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div
      style={{
        width: "100%",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {groupsList.map((singleGroup) => (
        <div
          style={{
            width: "100%",
            padding: 2,
            border: "1px solid red",
          }}
        >
          <p>{singleGroup.groupName}</p>
          {singleGroup.groupType === "alumni" ? (
            <p>Alumni Group</p>
          ) : (
            <p>Non Alumni Group</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default GroupsList;
