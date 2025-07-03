/**
 * ProfilePage.jsx
 * This component displays the user's profile information and their events.
 * It allows the user to edit their profile details such as name and location.
 * The profile information is fetched from the API, and the user can update it through a dialog.
 * The user's events are displayed in a vertical carousel format.
 *
 * NEED TO FIX PROFILE EDITING - use autocomplete for location
 *
 * @component
 * @example
 * <ProfilePage />
 * @returns {JSX.Element} The rendered ProfilePage component.
 */

import Layout from "../Layout/Layout";
import CreateEventButton from "../CreateEventPage/CreateEventButton";
import VerticalEvents from "../VerticalEvents/VerticalEvents";
import "./ProfilePage.css";
import {
  getUserById,
  getUserEvents,
  getSessionUserId,
  updateUserProfile,
  uploadProfileImage,
} from "../../api";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const fileInputRef = useRef();

  /**
   * useEffect hook to fetch user data and events when the component mounts.
   * It retrieves the user ID from the session, fetches the user data and their events
   * from the API, and updates the state accordingly.
   * If the user data cannot be fetched, it sets the userData state to null.
   */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getSessionUserId();
        const user = await getUserById(userId);
        setUserData(user);
        const events = await getUserEvents(userId);
        setUserEvents(events);
      } catch (err) {
        setUserData(null);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setEditName(userData.name || "");
      setEditLocation(userData.location || "");
    }
  }, [userData]);


  /**   
   * Handles the profile update form submission.
   * It uploads a new profile image if one is selected,
   * and updates the user's profile with the new name, location, and avatar URL.
   * 
   * @param {Event} e - The form submission event.
   * @returns {Promise<void>} A promise that resolves when the profile is updated.
   * @throws {Error} If the profile update fails or if the image upload fails.
   */
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    let avatarUrl = userData.avatar;
    const file = fileInputRef.current?.files?.[0];

    // Upload new profile image if selected
    if (file) {
      try {
        avatarUrl = await uploadProfileImage(userData.id, file);
      } catch (err) {
        alert("Failed to upload profile image");
        return;
      }
    }

    // Update profile with new name, location, and avatar
    try {
      await updateUserProfile(userData.id, {
        name: editName,
        location: editLocation,
        avatar: avatarUrl,
      });
      setUserData({
        ...userData,
        name: editName,
        location: editLocation,
        avatar: avatarUrl,
      });
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <Layout>
      <div className="profilepage-split">
        <div className="profilepage-left">
          <h2 className="events-title">Your Events</h2>
          <VerticalEvents events={userEvents} />
          <CreateEventButton />
        </div>
        <div className="profilepage-right">
          {userData ? (
            <div className="profile-card">
              <div className="profile-avatar">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : userData.name ? (
                  userData.name[0].toUpperCase()
                ) : (
                  "?"
                )}
              </div>
              <div className="profile-info">
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
                <p>{userData.location.address}</p>
              </div>
            </div>
          ) : (
            <div>No User Data Found...</div>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleProfileUpdate}>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Username</Label>
                    <Input
                      id="username-1"
                      name="username"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="location-1">Profile Picture</Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="location-1">Location</Label>
                    <Input
                      id="location-1"
                      name="location"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit">Save changes</Button>
                  </DialogClose>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}
