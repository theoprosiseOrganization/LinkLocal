/**
 * SearchModal.jsx
 * This component provides a search modal for searching friends.
 * It includes a search input and displays search results.
 * It allows users to search for friends by name or email and view their profiles.
 * It also allows users to follow other users directly from the search results.
 * It uses the Command component for search functionality and Dialog for displaying user details.
 *
 * @component
 * @example
 * <SearchModal />
 * @returns {JSX.Element} The rendered SearchModal component.
 */
import React, { useEffect } from "react";

import {
  Command,
  CommandInput,
  CommandList,
} from "../../../components/ui/command";
import { Button } from "../../../components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import ViewUserButton from "../ViewUserPage/ViewUserButton";

import { searchForUsers, followUser, getSessionUserId } from "../../api";

export default function SearchModal() {
  const [open, setOpen] = React.useState(false);
  const [friendsResults, setFriendsResults] = React.useState([]);
  const [currentUserId, setCurrentUserId] = React.useState(null);
  const [selectedFriend, setSelectedFriend] = React.useState(null);
  const inputRef = React.useRef(null);

  /**
   * This function handles the search input change.
   * It retrieves the search query from the input and calls the searchForUsers API function.
   * The results are then displayed in the command list.
   *
   * @param {string} query - The search query entered by the user.
   */
  const handleSearchChange = async (query) => {
    if (!query) {
      setFriendsResults([]);
      return;
    }
    try {
      const results = await searchForUsers(query);
      setFriendsResults(results);
    } catch (error) {
      setFriendsResults([]);
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

  const handleFollow = async (followingId) => {
    if (!currentUserId) return;
    try {
      await followUser(currentUserId, followingId);
      // Handle successful follow action
    } catch (e) {
      // Handle error
    }
  };

  return (
    <>
      <Command>
        <CommandInput
          ref={inputRef}
          placeholder="Search for users by name or email..."
          onValueChange={handleSearchChange}
        />
        <CommandList>
          {friendsResults.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between bg-[var(--card)] text-[var(--card-foreground)] rounded-xl shadow p-4 mb-2 hover:bg-[var(--muted)] transition-colors"
            >
              <div className="flex-1 text-center">
                <div className="font-semibold text-[var(--primary)]">
                  {friend.name}
                </div>
                <div className="text-[var(--muted-foreground)] text-sm">
                  {friend.email}
                </div>
              </div>
              <Button
                variant="outline"
                className="ml-4"
                onClick={() => {
                  setSelectedFriend(friend);
                  setOpen(true);
                }}
              >
                View
              </Button>
            </div>
          ))}
        </CommandList>
      </Command>
      {selectedFriend && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[500px] bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-xl shadow-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-[var(--primary)]">
                  {selectedFriend.name}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  className="ml-2"
                  onClick={() => handleFollow(selectedFriend.id)}
                >
                  Follow User
                </Button>
                <ViewUserButton userId={selectedFriend.id} />
              </DialogTitle>
              <DialogDescription className="text-[var(--muted-foreground)]">
                Email: {selectedFriend.email}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Label>Location</Label>
              {selectedFriend.location ? (
                <div className="text-[var(--foreground)]">
                  {selectedFriend.location.address}
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
