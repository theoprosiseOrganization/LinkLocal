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
import HorizontalEvents from "../VerticalEvents/HorizontalEvents";
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
import InvitesList from "./InvitesList";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editTags, setEditTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [tagsToAdd, setTagsToAdd] = useState([]);
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
      setEditTags(userData.tags ? userData.tags.map((tag) => tag.id) : []);
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

    if (file) {
      try {
        avatarUrl = await uploadProfileImage(userData.id, file);
      } catch (err) {
        alert("Failed to upload profile image");
        return;
      }
    }
    // Convert tag IDs to tag names
    const tagNames = editTags.map((tag) => {
      // If it's an ID, find the tag name
      const tagObj = allTags.find((t) => t.id === tag);
      return tagObj ? tagObj.name : tag; // If not found, it's a new tag (string)
    });
    if (tagsToAdd.length > 0) {
      tagNames.push(...tagsToAdd);
    }

    try {
      await updateUserProfile(userData.id, {
        name: editName,
        location: editLocation,
        avatar: avatarUrl,
        tags: tagNames,
      });
      setUserData({
        ...userData,
        name: editName,
        location: editLocation,
        avatar: avatarUrl,
        tags: allTags.filter((tag) => editTags.includes(tag.id)),
      });
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <Layout>
      <div className="profilepage-vertical">
        {/* Top Section: User Info */}
        <div className="profilepage-top">
          {userData ? (
            <div className="profile-card-horizontal">
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
              <div className="profile-info-horizontal">
                <h1 className="profile-title">Your Profile</h1>
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
                <p>{userData.location.address}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="edit-profile-btn">
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px] max-h-[90vw] overflow-y-auto">
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
                      <Label>Hobbies/Interests:</Label>
                      <TagsSearch
                        tags={allTags}
                        value={editTags}
                        onTagSelect={(selectedTagIds) =>
                          setEditTags(selectedTagIds)
                        }
                        onAddTag={(newTag) => {
                          if (newTag && !editTags.includes(newTag)) {
                            setEditTags([...editTags, newTag]);
                          }
                          // Add the new tag to allTags if not already present
                          if (
                            newTag &&
                            !allTags.some(
                              (tag) =>
                                tag.name.toLowerCase() === newTag.toLowerCase()
                            )
                          ) {
                            setAllTags([
                              ...allTags,
                              { id: newTag, name: newTag }, // Use name as id for new tags (until backend assigns real id)
                            ]);
                          }
                        }}
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
          ) : (
            <div>No User Data Found.</div>
          )}
        </div>
        {/* Bottom Section: Horizontal Events */}
        <div className="profilepage-bottom">
          <section className="events-section">
            <h2 className="events-title">Your Events</h2>
            <div className="events-carousel-container">
              <HorizontalEvents events={userEvents} />
            </div>
            <CreateEventButton />
          </section>
          <section className="invites-section">
            <h2 className="invites-title">Your Invites</h2>
            <InvitesList />
          </section>
        </div>
      </div>
    </Layout>
  </APIProvider>
  );
}