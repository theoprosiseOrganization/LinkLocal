/**
 *
 *
 */

import { getUserById, getUserFriends, getSessionUserId } from "../../api";
import React, { useEffect, useState } from "react";
import "../ProfilePage/ProfilePage.css";

export default function PeopleGrid(props) {
  const type = props.type || "followers";
  const [userData, setUserData] = useState(null);
  const [userPeople, setUserPeople] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getSessionUserId();
        const user = await getUserById(userId);
        setUserData(user);
        const people = "";//await getUserFriends(userId);
        setUserPeople(friends);
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
          userPeople.map((friend) => (
            <div
              className="profile-card"
              key={friend.id}
              style={{ minWidth: 240 }}
            >
              <div className="profile-avatar">
                {friend.name ? friend.name[0].toUpperCase() : "?"}
              </div>
              <div className="profile-info">
                <h2>{friend.name}</h2>
                <p>{friend.email}</p>
                <p>{friend.location && friend.location.address}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
