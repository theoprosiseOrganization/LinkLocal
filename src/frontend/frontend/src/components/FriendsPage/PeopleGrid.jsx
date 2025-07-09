/**
 * PeopleGrid.jsx
 * This component displays a grid of users who are either followers or following the current user.
 * It fetches the user data and their followers or following list from the API.
 * The type of list to display (Followers or Following) can be specified via props.
 *
 * @component
 * @example
 * <PeopleGrid type="Followers" />
 * <PeopleGrid type="Following" />
 * @returns {JSX.Element} The rendered PeopleGrid component.
 *
 */

import {
  getUserFollowers,
  getUserFollowing,
  getSessionUserId,
  getSuggestedUsers,
} from "../../api";
import ViewUserButton from "../ViewUserPage/ViewUserButton";
import React, { useEffect, useState } from "react";
import "../ProfilePage/ProfilePage.css";

export default function PeopleGrid(props) {
  const type = props.type || "Followers";
  const [userPeople, setUserPeople] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getSessionUserId();
        let people = [];
        if (type === "Followers") {
          people = await getUserFollowers(userId);
        }
        if (type === "Following") {
          people = await getUserFollowing(userId);
        }
        if (type === "Suggested") {
          people = await getSuggestedUsers(userId);
        }
        setUserPeople(people);
      } catch (err) {
        // If there's an error fetching user data, set userPeople to an empty array
        setUserPeople([]);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <h2 className="events-title">
        {type === "Suggested" ? "Suggested Users" : type}
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {/* This displays a list of people cards with their information */}
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
                <ViewUserButton userId={person.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
