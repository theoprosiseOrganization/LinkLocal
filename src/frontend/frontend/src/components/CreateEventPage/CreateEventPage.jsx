/**
 *  CreateEventPage.jsx
 *  This component renders the Create Event page - a form for users to fill in the information about an event.
 *
 *  @component CreateEventPage
 *  @example
 *  <CreateEventPage />
 *  @returns {JSX.Element} A component containing the Create Event page content.
 */
import Layout from "../Layout/Layout";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import React, { useState } from "react";
import { createEvent } from "../../../src/api";

export default function CreateEventPage() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    images: [],
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch userId from session
    let userId = null;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_DB_URL || "http://localhost:3000"}/auth/me`,
        { method: "POST", credentials: "include" }
      );
      if (res.ok) {
        const data = await res.json();
        userId = data.userId;
      }
    } catch (err) {
      alert("Could not get user session.");
      return;
    }

    try {
      await createEvent({
        userId,
        images: [""],
        location: eventData.location,
        textDescription: eventData.description,
        title: eventData.title,
      });
      alert("Event created!");
      setEventData({ title: "", description: "", location: "", images: [] });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout>
      Create Event Page
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={eventData.title}
              onChange={handleChange}
              type="text"
              placeholder="Fun Event"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="location">Location</Label>
            </div>
            <Input
              id="location"
              type="text"
              value={eventData.location}
              onChange={handleChange}
              placeholder="123 Main St, City, Country"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Event Description</Label>
            <Input
              id="description"
              value={eventData.description}
              onChange={handleChange}
              type="text"
              placeholder="Describe your event"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
          </div>
          <div className="grid gap-2">
            <Button type="submit" className="w-full">
              Create Event
            </Button>
            {/* Placeholder for share event functionality */}
            <Button className={"w-full"} variant="outline">
              Share Event
            </Button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
