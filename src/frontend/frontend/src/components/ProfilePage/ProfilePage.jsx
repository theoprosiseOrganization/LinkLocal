/**
 * ProfilePage.jsx
 *
 * This component displays the user's profile information and their events.
 * It allows the user to edit their profile details such as name and location.
 * The profile information is fetched from the API, and the user can update it through a dialog.
 * The user's events are displayed in a vertical carousel format.
 *
 *
 * @component
 * @example
 * <ProfilePage />
 * @returns {JSX.Element} The rendered ProfilePage component.
 */

import Layout from "../Layout/Layout";
import CreateEventButton from "../CreateEventPage/CreateEventButton";
import VerticalEvents from "../VerticalEvents/VerticalEvents";
import LocationAutocomplete from "../LocationAutocomplete/LocationAutocomplete";
import "./ProfilePage.css";
import TagsSearch from "../Tags/TagsSearch";
import {
  getUserById,
  getUserEvents,
  getSessionUserId,
  updateUserProfile,
  uploadProfileImage,
  getAllTags,
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
import { APIProvider } from "@vis.gl/react-google-maps";
import { Tag } from "lucide-react";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editTags, setEditTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
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
        setEditTags(user.tags);
        const events = await getUserEvents(userId);
        setUserEvents(events);
        const allTags = await getAllTags();
        setAllTags(allTags);
      } catch (err) {
        setUserData(null);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setEditName(userData.name || "");
      setEditLocation(
        userData.location || { address: "", latitude: 0, longitude: 0 }
      );
      setEditTags(userData.tags ? userData.tag : []);
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
    let tagNames = editTags.map((tag) => tag.name).filter(Boolean); // Filter out any null values
    if (tagNames.length === 0) {
      tagNames = []; // Ensure it's an empty array if no tags are selected
    }
    // Update profile with new name, location, avatar, and tag names
    try {
      await updateUserProfile(userData.id, {
        name: editName,
        location: editLocation,
        avatar: avatarUrl,
        tags: tagNames, // Pass array of tag names
      });
      setUserData({
        ...userData,
        name: editName,
        location: editLocation,
        avatar: avatarUrl,
        tags: tagNames, // Update local state with tag names
      });
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
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
                    Make changes to your profile here. Click save when
                    you&apos;re done.
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
                    <div className="grid gap-2">
                      <Label htmlFor="location-1">Location</Label>
                      <LocationAutocomplete
                        onPlaceSelect={(place) => {
                          setEditLocation({
                            address: place.Dg.formattedAddress,
                            latitude: place.Dg.location.lat,
                            longitude: place.Dg.location.lng,
                          });
                        }}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label>Tags</Label>
                      <TagsSearch
                        tags={allTags}
                        value={editTags}
                        onTagSelect={(selectedTagIds) =>
                          setEditTags(selectedTagIds)
                        }
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
    </APIProvider>
  );
}
