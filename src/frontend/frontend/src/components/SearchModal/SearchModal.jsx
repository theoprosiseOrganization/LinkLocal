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
import React, { useEffect, useRef } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../../components/ui/command";
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

import {
  searchForUsers,
  followUser,
  getSessionUserId,
  addUserFriend,
} from "../../api";

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
              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-1 text-center">
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {friend.name}
                </div>
                <div className="text-gray-500 text-sm">{friend.email}</div>
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedFriend.name}
                <Button
                  type="button"
                  variant="outline"
                  className="ml-2"
                  onClick={() => handleFollow(selectedFriend.id)}
                >
                  Follow User
                </Button>
              </DialogTitle>
              <DialogDescription>
                Email: {selectedFriend.email}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Label>Location</Label>
              {selectedFriend.location ? (
                <div className="text-gray-700 dark:text-gray-300">
                  {selectedFriend.location.address}
                  </div>
                ) : (
                <div className="text-gray-500 dark:text-gray-400">
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
