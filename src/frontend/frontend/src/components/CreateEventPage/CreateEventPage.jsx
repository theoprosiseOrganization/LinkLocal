/**
 *  CreateEventPage.jsx
 *
 * This component provides a form for users to create a new event.
 * It includes fields for the event title, description, location,
 * and images. The component handles form submission, image uploads,
 * and integrates with Google Maps for location selection.
 *
 * @component CreateEventPage
 * @example
 * <CreateEventPage />
 * @returns {JSX.Element} A component containing the Create Event page content.
 */

import Layout from "../Layout/Layout";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import React, { useState, useRef } from "react";
import { createEvent, uploadEventImages } from "../../api";
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

  const fileInputRef = useRef();

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.id]: e.target.value,
    });
  };

  /**
   *
   * This function handles the form submission for creating a new event.
   * It performs the following steps:
   * 1. Prevents the default form submission behavior.
   * 2. Fetches the user ID from the session using a POST request to `/
   * auth/me`.
   * 3. Calls the `createEvent` function with the event data, including
   * the user ID, location, title, and description.
   * 4. If images are provided, it uploads them using the `uploadEventImages`
   * function, which returns an array of image URLs.
   * 5. Updates the event with the image URLs if any images were uploaded.
   * 6. Resets the form state and file input after successful event creation.
   *
   * It must upload images separately, as image upload requires an event ID
   * to be created.
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

    let event;
    try {
      event = await createEvent({
        userId,
        images: [],
        location: eventData.location,
        textDescription: eventData.textDescription,
        title: eventData.title,
      });
    } catch (err) {
      alert(err.message);
      return;
    }

    let imageUrls = [];
    const files = fileInputRef.current?.files;
    if (files && files.length > 0 && files.length <= 5) {
      try {
        imageUrls = await uploadEventImages(event.id, files);
      } catch (err) {
        alert("Image upload failed");
      }
    }

    // 4. Update event with image URLs, if any
    if (imageUrls.length > 0) {
      await fetch(
        `${import.meta.env.VITE_API_DB_URL || "http://localhost:3000"}/events/${
          event.id
        }`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ images: imageUrls }),
        }
      );
    }

    alert("Event created!");
    setEventData({
      title: "",
      textDescription: "",
      location: { address: "", latitude: 0, longitude: 0 },
      images: [],
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
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
              <Label htmlFor="picture">Pictures (up to 5)</Label>
              <Input
                id="picture"
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
              />
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
