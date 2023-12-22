import React, { useState, useRef } from 'react';
import './style.css';
import { useOutsideClick } from '../../utilities/hooks/useOutsideClick';
import { useEventModal } from '../../utilities/hooks/useEventModal'
import { BsSend } from "react-icons/bs";
import { Show } from '../../helpers/functional';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EventModal= ({ isOpen, onClose }: EventModalProps) => {
  const [ eventCount, setEventCount ] = useState<string>('');
  const [ eventName, setEventName ] = useState<string>('');
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const { updateEventCount, isLoading } = useEventModal();

  // Could create react router action
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(eventCount, eventName)
    updateEventCount({eventName: eventName, eventCount: eventCount});
    setEventCount('');
    setEventName('');
    onClose();
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => onClose());

  return (
    <>
      <Show when={!isEditing}>
        <div className={`modal ${isOpen ? 'block' : ''}`} >
          <div className="modal-content" ref={wrapperRef}>
            <span className="close" onClick={onClose}>&times;</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', textAlign: 'left', width: '100%', paddingTop: '32px'}}>
              <h3 style={{ marginLeft: '24px', color: "#8E99B0" }}>Record event.</h3>
              <p style={{  marginLeft: '24px', boxSizing: 'border-box' }}>Submitting this event will update your progress and will be shown to other members in your group.</p>
            </div>
            
            <hr style={{ border: '1px solid #212734', margin: '16px'}} />
            <form onSubmit={handleFormSubmit} className='modal-form'>
              <div style={{ }}>
                <label htmlFor="event">Event</label>
                <select
                  id="event"
                  name="event"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                >
                  <option value="" disabled>Choose an Event</option>
                  <option value="pushup">Push-ups</option>
                  <option value="pullup">Pull-ups</option>
                  <option value="running">Running</option>
                </select>
              </div>
              <div style={{ }}>
                <label htmlFor="eventCount">Total Count</label>
                <input
                  type="number"
                  inputMode='numeric'
                  id="eventCount"
                  name="eventCount"
                  value={eventCount}
                  onChange={(e) => setEventCount(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <span className='updateModal-btn' onClick={() => setIsEditing(true)}>Update an event from a previous day? Click here</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'right', gap: '16px', padding: '24px 40px'}}>
                  <button className='goBack-btn' onClick={() => onClose()}>
                    Go Back
                  </button>
                  <button className='update-btn' type='submit'>
                    <BsSend />
                    {isLoading ? 'Loading...' : 'Complete'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Show>
      <Show when={isEditing}>
        <Show when={isEditing && true}>
          <div className={`modal ${isOpen ? 'block' : ''}`} >
            <div className="modal-content" ref={wrapperRef}>
              <span className="close" onClick={onClose}>&times;</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', textAlign: 'left', width: '100%', paddingTop: '32px'}}>
                <h3 style={{ marginLeft: '24px', color: "#8E99B0" }}>Update Existing Record.</h3>
                <p style={{  marginLeft: '24px', boxSizing: 'border-box' }}>Select the event you would like to change.</p>
              </div>
              
              <hr style={{ border: '1px solid #212734', margin: '16px'}} />
              <form onSubmit={() => null} className='modal-form'>
                <div style={{ }}>
                  <label htmlFor="event">Event</label>
                  <select
                    id="event"
                    name="event"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                  >
                    <option value="" disabled>Choose an Event</option>
                    <option value="pushup">Push-ups</option>
                    <option value="pullup">Pull-ups</option>
                    <option value="running">Running</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'right', gap: '16px', padding: '24px 40px'}}>
                    <button className='goBack-btn' onClick={() => setIsEditing(false)}>
                      Go Back
                    </button>
                    <button className='update-btn' onClick={() => null}>
                      <BsSend />
                      {isLoading ? 'Loading...' : 'Update'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Show>
        <Show when={isEditing && true}>
          <div className={`modal ${isOpen ? 'block' : ''}`} >
            <div className="modal-content" ref={wrapperRef}>
              <span className="close" onClick={onClose}>&times;</span>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', textAlign: 'left', width: '100%', paddingTop: '32px'}}>
                <h3 style={{ marginLeft: '24px', color: "#8E99B0" }}>Update Existing Record.</h3>
                <p style={{  marginLeft: '24px', boxSizing: 'border-box' }}>Select the record that you would wish to change.</p>
              </div>
              
              <hr style={{ border: '1px solid #212734', margin: '16px'}} />
              <form onSubmit={() => null} className='modal-form'>
                <div style={{ }}>
                  <label htmlFor="event">Records in the past week</label>
                  <select
                    id="event"
                    name="event"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                  >
                    <option value="" disabled>Choose an Event</option>
                    <option value="pushup">Push-ups</option>
                    <option value="pullup">Pull-ups</option>
                    <option value="running">Running</option>
                  </select>
                </div>
                <div style={{ }}>
                  <label htmlFor="eventCount">Update Count</label>
                  <input
                    type="number"
                    inputMode='numeric'
                    id="eventCount"
                    name="eventCount"
                    value={eventCount}
                    onChange={(e) => setEventCount(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'right', gap: '16px', padding: '24px 40px'}}>
                    <button className='goBack-btn' onClick={() => setIsEditing(false)}>
                      Go Back
                    </button>
                    <button className='update-btn' type='submit'>
                      <BsSend />
                      {isLoading ? 'Loading...' : 'Update'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Show>
        
      </Show>
    </>
    
  );
};
