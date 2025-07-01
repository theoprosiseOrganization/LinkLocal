/**
 *
 *
 */

import {
  getUserById,
  getUserFollowers,
  getUserFollowing,
  getSessionUserId,
} from "../../api";
import React, { useEffect, useState } from "react";
import "../ProfilePage/ProfilePage.css";

export default function PeopleGrid(props) {
  const type = props.type || "Followers";
  const [userData, setUserData] = useState(null);
  const [userPeople, setUserPeople] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getSessionUserId();
        const user = await getUserById(userId);
        let people = [];
        setUserData(user);
        if (type === "Followers") {
          people = await getUserFollowers(userId);
        }
        if (type === "Following") {
          people = await getUserFollowing(userId);
        }
        setUserPeople(people);
      } catch (err) {
        setUserData(null);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <h2 className="events-title">{type}</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {userPeople.length === 0 ? (
          <div>No friends found.</div>
        ) : (
          userPeople.map((person) => (
            <div
              className="profile-card"
              key={person.id}
              style={{ minWidth: 240 }}
            >
              <div className="profile-avatar">
                {person.name ? person.name[0].toUpperCase() : "?"}
              </div>
              <div className="profile-info">
                <h2>{person.name}</h2>
                <p>{person.email}</p>
                <p>{person.location && person.location.address}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
