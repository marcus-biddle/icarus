import React, { useState } from 'react'
 
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { updateCurrentEvent, updateGraphs } from '../../features/user/userSlice';
import { TbArrowsSort } from "react-icons/tb";
import { IoCheckmarkOutline } from "react-icons/io5";

export const ExerciseSelection = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("pushups")

  const eventIds = useSelector((state: RootState) => state.user.currentUser?.eventIds) || [];
  const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId) || '';
  const dispatch = useDispatch();

  return (
    <div className=' w-full text-right'>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between shadow-lg"
            >
            {`Exercise: ${currentEventId.charAt(0).toUpperCase() + currentEventId.slice(1)}`}
            <TbArrowsSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandInput placeholder="Search event..." className="h-9" />
                <CommandEmpty>No event found.</CommandEmpty>
                <CommandGroup>
                {eventIds.map((event) => (
                    <CommandItem
                    key={event}
                    value={event}
                    onSelect={(currentValue) => {
                        setValue(currentValue)
                        setOpen(false)
                        dispatch(updateCurrentEvent(event))
                        dispatch(
                        updateGraphs()
                        )
                    }}
                    >
                    {event.charAt(0).toUpperCase() + event.slice(1)}
                    <IoCheckmarkOutline
                        className={cn(
                        "ml-auto h-4 w-4",
                        event === currentEventId ? "opacity-100" : "opacity-0"
                        )}
                    />
                    </CommandItem>
                ))}
                </CommandGroup>
            </Command>
            </PopoverContent>
        </Popover>
    </div>
  )
}