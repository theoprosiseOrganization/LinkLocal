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
import React from "react";

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

import { searchForUsers, addUserFriend } from "../../api";

export default function SearchModal() {
  const [open, setOpen] = React.useState(false);
  const [friendsResults, setFriendsResults] = React.useState([]);

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

  return (
    <>
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput
          placeholder="Search for friends..."
          onValueChange={handleSearchChange}
        />
      </Command>
      <Command>
        <CommandList>
          {friendsResults.map((friend) => (
            <CommandItem key={friend.id} value={friend.id}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="ml-2">
                    {friend.name} ({friend.email})
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                        {friend.name}
                        <Button variant="outline" className="ml-2" onClick={() => addUserFriend(friend.id)}>
                            Follow User
                        </Button>
                    </DialogTitle>
                    <DialogDescription>Email: {friend.email}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Label>Name</Label>
                  </div>
                </DialogContent>
              </Dialog>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </>
  );
}
