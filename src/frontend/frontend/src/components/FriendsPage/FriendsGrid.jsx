/**
 *
 *
 */

import { getUserById, getUserFriends, getSessionUserId } from "../../api";
import React, { useEffect, useState } from "react";
import "../ProfilePage/ProfilePage.css";

export default function FriendsGrid() {
  const [userData, setUserData] = useState(null);
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getSessionUserId();
        const user = await getUserById(userId);
        setUserData(user);
        const friends = await getUserFriends(userId);
        setUserFriends(friends);
      } catch (err) {
        setUserData(null);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <h2 className="events-title">Your Friends</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {userFriends.length === 0 ? (
          <div>No friends found.</div>
        ) : (
          userFriends.map((friend) => (
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
