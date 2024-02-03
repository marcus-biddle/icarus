import React, { ReactNode } from 'react'
import StatsBar from '../StatsBar/StatsBar'
import { useIsMobile } from '../../utilities/hooks/useIsMobile';
import './index.css'
import { NavLink } from 'react-router-dom';
import { LEAGUE_LEVELS } from '../../NEWlayouts/Leaderboard/Leaderboard';
import { DynamicIcon } from '../Icons/DynamicIcon';
import { GiLaurelsTrophy } from "react-icons/gi";
import { Show } from '../../helpers/functional';

 
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

const TwoColumnGrid = ({ children, showSecondColumnInMobile }: { children: ReactNode, showSecondColumnInMobile: boolean }) => {
  const isMobile = useIsMobile({});
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [goal, setGoal] = React.useState(350)
 
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
          
          <div className=" flex flex-row gap-2">
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
            {/* <Show when={showSecondColumnInMobile || !isMobile}>
              <StatsBar />
            </Show>
            
            <Show when={!isMobile}>
              <div className='container' style={{ margin: '24px 0', padding: '0 24px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', padding: '10px 0'}}>
                  <span style={{ fontWeight: '700'}}>[Month] Events</span>
                  <NavLink to={'/duo/history'} style={{ fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '13px', color: 'lightblue'}}>
                    View History
                  </NavLink>
                </div>
                <div style={{ padding: '10px 0 24px 0', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <span>Pushups</span>
                    <span>100</span>
                    <span>200 XP</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <span>Pullups</span>
                    <span>75</span>
                    <span>100 XP</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <span>Running</span>
                    <span>20</span>
                    <span>300 XP</span>
                  </div>
                </div>
              </div>
              <div className='container' style={{ margin: '24px 0', padding: '0 24px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', padding: '10px 0'}}>
                  <span style={{ fontWeight: '700'}}>Gold League</span>
                  <NavLink to={'/duo/leaderboard'} style={{ fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.12px', fontSize: '13px', color: 'lightblue'}}>
                    View League
                  </NavLink>
                </div>
                <div style={{ display: 'flex', padding: '10px 0 24px 0'}}>
                  <DynamicIcon icon={GiLaurelsTrophy} height={isMobile ? '30px' : '60px'} width={isMobile ? '30px' : '60px'} color={LEAGUE_LEVELS[2].color} padding='0 24px 0 0' />
                  <div style={{ textAlign: 'left', fontSize: '20px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <p style={{ fontWeight: '700', color: 'white'}}>You're ranked #2</p>
                    <p>You've earned 20 XP this week so far</p>
                  </div>
                </div>
              </div>
            </Show> */}
          </div>
        </div>
  )
}

export default TwoColumnGrid