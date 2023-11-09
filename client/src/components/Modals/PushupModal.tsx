import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-router-dom';
import './style.css';
import { usePushupCounter } from '../../utilities/hooks/usePushupCounter';
import { useOutsideClick } from '../../utilities/hooks/useOutsideClick';

interface PushupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PushupModal= ({ isOpen, onClose }: PushupModalProps) => {
  const [pushupCount, setPushupCount] = useState<string>('');
  const { increasePushupCount, isLoading, closeModal, openModal, isModalOpen } = usePushupCounter();

  // Could create react router action
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    increasePushupCount(pushupCount);
    setPushupCount('');
    onClose();
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, onClose);

  return (
    <div className={`modal ${isOpen ? 'block' : ''}`} >
      <div className="modal-content" ref={wrapperRef}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Pushups</h2>
        <p>This will be recorded for {'[insert date]'}</p>
        <Form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <label htmlFor="pushupCount">Number of Pushups:</label>
            <input
              type="number"
              id="pushupCount"
              name="pushupCount"
              value={pushupCount}
              onChange={(e) => setPushupCount(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">{isLoading ? 'Loading...' : 'Add Pushups'}</button>
        </Form>
      </div>
    </div>
  );
};
