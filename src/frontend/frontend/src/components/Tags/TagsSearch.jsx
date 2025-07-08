import React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

export default function TagsSearch({
  tags = [],
  value = [],
  onTagSelect,
  onAddTag,
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const handleSetValue = (val) => {
    let newValue;
    if (value.includes(val)) {
      newValue = value.filter((item) => item !== val);
    } else {
      newValue = [...value, val];
    }
    if (onTagSelect) {
      onTagSelect(newValue);
    }
  };

  const handleAddTag = () => {
    if (onAddTag && search.trim()) {
      onAddTag(search.trim());
      setSearch("");
    }
  };

  // Filter tags based on search input
  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );
  const tagExists = filteredTags.some(
    (tag) => tag.name.toLowerCase() === search.toLowerCase()
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[480px] justify-between"
        >
          <div className="flex gap-2 justify-start">
            {value.length
              ? value.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                  >
                    {tags.find((tag) => tag.id === val)?.name}
                  </div>
                ))
              : "Select tags..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0">
        <Command>
          <CommandInput
            placeholder="Search tags..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>No tags found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {filteredTags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.id}
                  onSelect={() => handleSetValue(tag.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(tag.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tag.name}
                </CommandItem>
              ))}
              {!tagExists && search.trim() && (
                <CommandItem
                  value={search}
                  onSelect={handleAddTag}
                  className="text-green-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add "{search}"
                </CommandItem>
              )}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
