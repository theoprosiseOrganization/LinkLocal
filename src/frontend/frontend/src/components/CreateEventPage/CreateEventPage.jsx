/**
 *  CreateEventPage.jsx
 *  This component renders the Create Event page - a form for users to fill in the
 *   information about an event.
 *   In the future it will need to handle image uploads and possibly more complex event data.
 *   It will also require more styling and layout adjustments to fit the
 *   overall design of the application.
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
import { createEvent } from "../../api";
import LocationAutocomplete from "../LocationAutocomplete/LocationAutocomplete";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function CreateEventPage() {
  const [eventData, setEventData] = useState({
    title: "",
    textDescription: "",
    // location stores { address, latitude, longitude }
    location: { address: "", latitude: 0, longitude: 0 },
    images: [],
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.id]: e.target.value,
    });
  };

  /**
   *  Handles the form submission for creating an event.
   *   It fetches the userId from the session, then calls the createEvent function
   *   with the event data. If successful, it resets the form and alerts the user
   *
   *  @param {Event} e - The event object triggered by the form submission.
   *  @returns {Promise<void>} A promise that resolves when the event is created.
   *  @throws {Error} If the user session cannot be fetched or if the event
   *  creation fails.
   *  @example
   *  handleSubmit(event);
   *
   */
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
        textDescription: eventData.textDescription,
        title: eventData.title,
      });
      alert("Event created!");
      setEventData({
        title: "",
        textDescription: "",
        location: "",
        images: [],
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
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
              <LocationAutocomplete
                onPlaceSelect={(place) => {
                  setEventData({
                    ...eventData,
                    location: {
                      address: place.Dg.formattedAddress,
                      latitude: place.Dg.location.lat,
                      longitude: place.Dg.location.lng,
                    },
                  });
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="textDescription">Event Description</Label>
              <Input
                id="textDescription"
                value={eventData.textDescription}
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
    </APIProvider>
  );
}
