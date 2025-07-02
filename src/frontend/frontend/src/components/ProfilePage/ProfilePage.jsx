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
} from "../../api";
import React, { use, useEffect, useState } from "react";
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
   * This function handles the profile update when the user submits the edit form.
   * It prevents the default form submission behavior, calls the API to update the user profile,
   * and updates the local state with the new profile information.
   * If the update fails, it alerts the user with an error message.
   *
   * @param {Event} e - The event object triggered by the form submission.
   */
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(userData.id, {
        name: editName,
        location: editLocation,
      });
      setUserData({ ...userData, name: editName, location: editLocation });
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
                {userData.name ? userData.name[0].toUpperCase() : "?"}
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
                      id="avatar-1"
                      name="avatar"
                      onChange={(e) => setEditLocation(e.target.value)}
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
