import React, { ReactNode } from 'react'
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import './index.css'
import { NavLink } from 'react-router-dom';
import { LEAGUE_LEVELS } from '../../NEWlayouts/Leaderboard/Leaderboard';
import { DynamicIcon } from '../Icons/DynamicIcon';
import { GiLaurelsTrophy } from "react-icons/gi";
import { Show } from '../../helpers/functional';
import { GoUnfold } from "react-icons/go";

 
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
 
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible"
import AverageVsDaily from '../Charts/AverageVsDaily';


const TwoColumnGrid = ({ children, showSecondColumnInMobile }: { children: ReactNode, showSecondColumnInMobile: boolean }) => {
  const isMobile = useIsMobile({});
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [goal, setGoal] = React.useState(350)
  const [isOpen, setIsOpen] = React.useState(false)
 
  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  const eventIds = useSelector((state: RootState) => state.user.currentUser?.eventIds) || [];
  const currentEventId = useSelector((state: RootState) => state.user.currentUser?.currentEventId) || '';
  const dispatch = useDispatch();

  return (
    <div className={"two-column-container"} style={{ flexDirection: isMobile ? 'column-reverse' : 'row', width: isMobile ? '100%' : ''}}>
          <div className="left-column" style={{ padding: isMobile ? '0' : '20px', height: isMobile ? '80vh' : '' }}>
            {children}
          </div>
          
          <div className=' flex flex-col gap-8'>
            <div className=" flex flex-row justify-between gap-8">
              <div>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                    {value
                      ? `Current event: ${eventIds.find((event) => event === value)}`
                      : `Current event: ${currentEventId}`}
                    {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
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
                            {event}
                            {/* <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                value === framework.value ? "opacity-100" : "opacity-0"
                              )}
                            /> */}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Create Goal</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>Repetition Goal</DrawerTitle>
                        <DrawerDescription>Set your daily count goal.</DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() => onClick(-10)}
                            disabled={goal <= 0}
                          >
                            {/* <MinusIcon className="h-4 w-4" /> */}---
                            <span className="sr-only">Decrease</span>
                          </Button>
                          <div className="flex-1 text-center">
                            <div className="text-7xl font-bold tracking-tighter">
                              {goal}
                            </div>
                            <div className="text-[0.70rem] uppercase text-muted-foreground">
                              repetition/day
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() => onClick(10)}
                            disabled={goal >= 3000}
                          >
                            {/* <PlusIcon className="h-4 w-4" /> */}++
                            <span className="sr-only">Increase</span>
                          </Button>
                        </div>
                        <div className="mt-3 h-[120px]">
                          {/* <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                              <Bar
                                dataKey="goal"
                                style={
                                  {
                                    fill: "hsl(var(--foreground))",
                                    opacity: 0.9,
                                  } as React.CSSProperties
                                }
                              />
                            </BarChart>
                          </ResponsiveContainer> */}
                        </div>
                      </div>
                      <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
            {false && <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="space-y-2 w-full mb-16"
            >
              <div className="flex items-center justify-between space-x-4 px-1">
                <h4 className="text-sm font-semibold">
                  Currently available graphs
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <GoUnfold className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm w-full">
                  <AverageVsDaily />
                </div>
              </CollapsibleContent>
            </Collapsible>}
          </div>
        </div>
  )
}

export default TwoColumnGrid