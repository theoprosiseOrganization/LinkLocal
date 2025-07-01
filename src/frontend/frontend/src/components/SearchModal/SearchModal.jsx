/**
 * SearchModal.jsx
 * This component provides a search modal for searching friends.
 * It includes a search input and displays search results.
 * It allows users to search for friends by name or email and view their profiles.
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

  //I want to focus the input everytime the query changes 
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

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
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput
          ref={inputRef}
          placeholder="Search for friends..."
          onValueChange={handleSearchChange}
        />
      </Command>
      <Command>
        <CommandList>
          {friendsResults.map((friend) => (
            <CommandItem key={friend.id} value={friend.id}>
              <Button
                variant="outline"
                className="ml-2"
                onClick={() => {
                  setSelectedFriend(friend);
                  setOpen(true);
                }}
              >
                {friend.name} ({friend.email})
              </Button>
            </CommandItem>
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
              <Label>Name</Label>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
