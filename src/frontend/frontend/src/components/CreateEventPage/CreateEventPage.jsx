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
import { Calendar } from "../../../components/ui/calendar";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import {
  createEvent,
  uploadEventImages,
  getSessionUserId,
  getAllTags,
} from "../../api";
import LocationAutocomplete from "../LocationAutocomplete/LocationAutocomplete";
import { APIProvider } from "@vis.gl/react-google-maps";
import TagsSearch from "../Tags/TagsSearch";
import { set } from "date-fns";

export default function CreateEventPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [startPopoverOpen, setStartPopoverOpen] = useState(false);
  const [endPopoverOpen, setEndPopoverOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:30");
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState("12:00");
  const [eventData, setEventData] = useState({
    title: "",
    textDescription: "",
    // location stores { address, latitude, longitude }
    location: { address: "", latitude: 0, longitude: 0 },
    images: [],
  });

  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const fileInputRef = useRef();

  useEffect(() => {
    async function fetchTags() {
      try {
        const tags = await getAllTags();
        setAllTags(tags);
      } catch (err) {
        setAllTags([]);
      }
    }
    fetchTags();
  }, []);

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
   * 3. Converts the selected tags into their names by mapping over
   * the `selectedTags` array and finding the corresponding tag object in
   * the `allTags` array.
   *    If a tag is not found, it uses the tag ID as the name.
   * 4. Calls the `createEvent` function with the event data, including
   * the user ID, location, title, description, and tags.
   * 5. If images are provided, it uploads them using the `uploadEventImages`
   * function, which returns an array of image URLs.
   * 6. Updates the event with the image URLs if any images were uploaded.
   * 7. Resets the form state and file input after successful event creation.
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
      userId = await getSessionUserId();
      if (!userId) {
        alert("Could not get user session.");
        return;
      }
    } catch (err) {
      alert("Could not get user session.");
      return;
    }

    const startDateTime = new Date(
      `${startDate.toISOString().split("T")[0]}T${startTime}`
    );
    const endDateTime = new Date(
      `${endDate.toISOString().split("T")[0]}T${endTime}`
    );

    const tagNames = selectedTags.map((tag) => {
      const tagObj = allTags.find((t) => t.id === tag);
      return tagObj ? tagObj.name : tag;
    });

    let event;
    try {
      event = await createEvent({
        userId,
        images: [],
        location: eventData.location,
        textDescription: eventData.textDescription,
        title: eventData.title,
        tags: tagNames,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      });
    } catch (err) {
      alert(err.message);
      return;
    }

    let imageUrls = [];
    const files = fileInputRef.current?.files;
    if (files && files.length > 0 && files.length <= 5) {
      setIsUploading(true);
      try {
        imageUrls = await uploadEventImages(event.id, files);
      } catch (err) {
        alert("Image upload failed");
      }
      setIsUploading(false);
    }

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
    setSelectedTags([]); // Reset tags
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Layout>
        <div className="max-w-2xl mx-auto mt-10 bg-[var(--card)] text-[var(--card-foreground)] rounded-xl shadow-lg border border-[var(--border)] p-8">
          <h1 className="text-2xl font-bold mb-6 text-[var(--primary)]">
            Create Event
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-[var(--foreground)]">
                  Event Title
                </Label>
                <Input
                  id="title"
                  value={eventData.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="Fun Event"
                  required
                  className="bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="location"
                    className="text-[var(--foreground)]"
                  >
                    Location
                  </Label>
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
                <Label
                  htmlFor="textDescription"
                  className="text-[var(--foreground)]"
                >
                  Event Description
                </Label>
                <Input
                  id="textDescription"
                  value={eventData.textDescription}
                  onChange={handleChange}
                  type="text"
                  placeholder="Describe your event"
                  required
                  className="bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                {/* Start Date/Time */}
                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor="start-date-picker"
                    className="px-1 text-[var(--foreground)]"
                  >
                    Start Date
                  </Label>
                  <Popover
                    open={startPopoverOpen}
                    onOpenChange={setStartPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="start-date-picker"
                        className="w-32 justify-between font-normal bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]"
                      >
                        {startDate
                          ? startDate.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0 bg-[var(--popover)] text-[var(--popover-foreground)] border border-[var(--border)]"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={startDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setStartDate(date);
                          setStartPopoverOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-3">
                  <Label
                    htmlFor="start-time-picker"
                    className="px-1 text-[var(--foreground)]"
                  >
                    Start Time
                  </Label>
                  <Input
                    type="time"
                    id="start-time-picker"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    step="1"
                    className="bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] appearance-none"
                  />
                </div>
                {/* End Date/Time */}
                <div className="flex flex-col gap-3">
                  <Label className="px-1 text-[var(--foreground)]">
                    End Date
                  </Label>
                  <Popover
                    open={endPopoverOpen}
                    onOpenChange={setEndPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-32 justify-between font-normal bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]"
                      >
                        {endDate ? endDate.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0 bg-[var(--popover)] text-[var(--popover-foreground)] border border-[var(--border)]"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={endDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setEndDate(date);
                          setEndPopoverOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-3">
                  <Label className="px-1 text-[var(--foreground)]">
                    End Time
                  </Label>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    step="1"
                    className="bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] appearance-none"
                  />
                </div>
              </div>

              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="picture" className="text-[var(--foreground)]">
                  Pictures (up to 5)
                </Label>
                <Input
                  id="picture"
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  disabled={isUploading}
                  className="bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]"
                />
                {isUploading && (
                  <Alert className="bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)]">
                    <AlertTitle>Uploading!</AlertTitle>
                    <AlertDescription>
                      Please wait while your images are being uploaded to our
                      servers.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="grid gap-3">
                <Label className="text-[var(--foreground)]">Tags</Label>
                <TagsSearch
                  tags={allTags}
                  value={selectedTags}
                  onTagSelect={setSelectedTags}
                  onAddTag={(newTag) => {
                    if (newTag && !selectedTags.includes(newTag)) {
                      setSelectedTags([...selectedTags, newTag]);
                    }
                    if (
                      newTag &&
                      !allTags.some(
                        (tag) => tag.name.toLowerCase() === newTag.toLowerCase()
                      )
                    ) {
                      setAllTags([...allTags, { id: newTag, name: newTag }]);
                    }
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Button
                  type="submit"
                  className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition"
                >
                  Create Event
                </Button>
                {/* Placeholder for share event functionality */}
                <Button
                  className="w-full border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition"
                  variant="outline"
                >
                  Share Event
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </APIProvider>
  );
}
