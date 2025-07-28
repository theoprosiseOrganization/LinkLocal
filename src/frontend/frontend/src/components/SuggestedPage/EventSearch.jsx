import React, { useEffect } from "react";

import {
  Command,
  CommandInput,
  CommandList,
} from "../../../components/ui/Command";
import { Button } from "../../../components/ui/Button.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/Dialog";
import { Label } from "../../../components/ui/Label";
import ViewUserButton from "../ViewUserPage/ViewUserButton";
import { followUser, getSessionUserId, searchEvents } from "../../api";
import ViewEventButton from "../ViewEventPage/ViewEventButton";

export default function EventSearch() {
  const [open, setOpen] = React.useState(false);
  const [eventsResults, setEventsResults] = React.useState([]);
  const [currentUserId, setCurrentUserId] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const inputRef = React.useRef(null);

  /**
   * This function handles the search input change.
   * It retrieves the search query from the input and calls the searchEvents API function.
   * The results are then displayed in the command list.
   *
   * @param {string} query - The search query entered by the user.
   */
  const handleSearchChange = async (query) => {
    if (!query) {
      setEventsResults([]);
      return;
    }
    try {
      const results = await searchEvents(query);
      setEventsResults(results);
    } catch (error) {
      setEventsResults([]);
      // Add error handling at some point
    }
  };

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const userId = await getSessionUserId();
        setCurrentUserId(userId);
      } catch (error) {
        // Handle error if unable to fetch user ID
      }
    };
    fetchCurrentUserId();
  }, []);

  return (
    <>
      <Command>
        <CommandInput
          ref={inputRef}
          placeholder="Search for events..."
          onValueChange={handleSearchChange}
        />
        <CommandList>
          {eventsResults.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between bg-[var(--card)] text-[var(--card-foreground)] rounded-xl shadow p-4 mb-2 hover:bg-[var(--muted)] transition-colors"
            >
              <div className="flex-1 text-center">
                <div className="font-semibold text-[var(--primary)]">
                  {event.title}
                </div>
                <div className="text-[var(--muted-foreground)] text-sm">
                  {event.textDescription || "No description provided"}
                </div>
              </div>
              <Button
                variant="outline"
                className="ml-4"
                onClick={() => {
                  setSelectedEvent(event);
                  setOpen(true);
                }}
              >
                View
              </Button>
            </div>
          ))}
        </CommandList>
      </Command>
      {selectedEvent && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[500px] bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-xl shadow-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-[var(--primary)]">
                  {selectedEvent.title}
                </span>
                <ViewEventButton eventId={selectedEvent.id} />
              </DialogTitle>
              <DialogDescription className="text-[var(--muted-foreground)]">
                Data:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Label>Location</Label>
              {selectedEvent.location ? (
                <div className="text-[var(--foreground)]">
                  {selectedEvent.location.address}
                </div>
              ) : (
                <div className="text-[var(--muted-foreground)]">
                  No location provided
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
