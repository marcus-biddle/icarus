import React, { useState, useRef } from 'react';
import { Form } from 'react-router-dom';
import './style.css';
import { usePushupCounter } from '../../utilities/hooks/usePushupCounter';
import { useOutsideClick } from '../../utilities/hooks/useOutsideClick';
import { Button } from '../Buttons/Button';

interface PushupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PushupModal= ({ isOpen, onClose }: PushupModalProps) => {
  const [pushupCount, setPushupCount] = useState<string>('');
  const { increasePushupCount, isLoading } = usePushupCounter();

  // Could create react router action
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    increasePushupCount(pushupCount);
    setPushupCount('');
    onClose();
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => onClose());

  return (
    <div className={`modal ${isOpen ? 'block' : ''}`} >
      <div className="modal-content" ref={wrapperRef}>
        <span className="close" onClick={onClose}>&times;</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', textAlign: 'left', width: '100%', paddingTop: '32px'}}>
          <h3 style={{ marginLeft: '24px' }}>Record event.</h3>
          <p style={{  marginLeft: '24px', boxSizing: 'border-box' }}>Submitting this event will update your progress and will be shown to other members in your group.</p>
        </div>
        
        <hr style={{ border: '1px solid #212734', margin: '16px'}} />
        {/* <p>Test</p> */}
        {/* <h2>Add Pushups</h2>
        <p>This will be recorded for <strong>{getCurrentDate()}</strong></p> */}
        <form onSubmit={handleFormSubmit} className='modal-form'>
          <div style={{ }}>
            <label htmlFor="group">Group</label>
            <select
              id="group"
              name="group"
              value={'N/A'}
              // onChange={(e) => setPushupCount(e.target.value)}
              required
            >
              <option value="" disabled>Select an event</option>
              <option value="event1">Group 1</option>
              <option value="event2">Group 2</option>
              <option value="event3">Group 3</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div style={{ }}>
            <label htmlFor="event">Event</label>
            <select
              id="event"
              name="event"
              value={'event'}
              // onChange={(e) => setPushupCount(e.target.value)}
              required
            >
              <option value="" disabled>Select an event</option>
              <option value="event1">Event 1</option>
              <option value="event2">Event 2</option>
              <option value="event3">Event 3</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div style={{ }}>
            <label htmlFor="pushupCount">Total Reps</label>
            <input
              type="number"
              inputMode='numeric'
              id="pushupCount"
              name="pushupCount"
              value={pushupCount}
              onChange={(e) => setPushupCount(e.target.value)}
              required
            />
          </div>
          <div style={{ margin: '24px'}}>
            <Button size='large' type='submit'>{isLoading ? 'Loading...' : 'Add Event'}</Button>
          </div>
          
          {/* <button type="submit">{isLoading ? 'Loading...' : 'Add Pushups'}</button> */}
        </form>
      </div>
    </div>
  );
};
