import Layout from "../Layout/Layout";
import CreateEventButton from "../CreateEventPage/CreateEventButton";
import VerticalEvents from "../VerticalEvents/VerticalEvents";
import "./ProfilePage.css";
import {
  getUserById,
  getUserEvents,
  getSessionUserId,
  updateUserProfile,
} from "../../../src/api";
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
      <div className="homepage-split">
        <div className="homepage-left">
          <h2 className="events-title">Your Events</h2>
          <VerticalEvents events={userEvents} />
          <CreateEventButton />
        </div>
        <div className="homepage-right">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleProfileUpdate}>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
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
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Location</Label>
                    <Input
                      id="location-1"
                      name="location"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {userData ? (
            <div className="profile-card">
              <div className="profile-avatar">
                {userData.name ? userData.name[0].toUpperCase() : "?"}
              </div>
              <div className="profile-info">
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
                <p>{userData.location}</p>
              </div>
            </div>
          ) : (
            <div>No User Data Found...</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
