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
import { updateCurrentEvent } from '../../features/user/userSlice';
import { TbArrowsSort } from "react-icons/tb";
import { IoCheckmarkOutline } from "react-icons/io5";
import { GiFlame } from 'react-icons/gi'

export const ExerciseSelection = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("pushups")

  const stats = useSelector((state: RootState) => state.user.currentUser?.statistics);
  const eventIds = useSelector((state: RootState) => state.user.currentUser?.eventIds) || [];
  const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId) || '';
  const dispatch = useDispatch();

  return (
    <div className={' w-full'}>
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between shadow-lg p-4 text-lg text-popever mb-8"
            >
            {`Exercise: ${currentEventId.charAt(0).toUpperCase() + currentEventId.slice(1)}`}
            <TbArrowsSort className="h-6 w-6 text-primary" />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[365px]">
            <Command className={' w-full'}>
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
                    }}
                    >
                    {event.charAt(0).toUpperCase() + event.slice(1)}
                    <IoCheckmarkOutline
                        className={cn(
                        "ml-auto h-4 w-4 text-primary",
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