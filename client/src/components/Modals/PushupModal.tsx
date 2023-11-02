import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import './style.css';
import { usePushupCounter } from '../../utilities/hooks/usePushupCounter';

interface PushupModalProps {
  isOpen: boolean;
}

export const PushupModal= ({ isOpen }: PushupModalProps) => {
  const [pushupCount, setPushupCount] = useState<string>('');
  const { increasePushupCount, isLoading, closeModal } = usePushupCounter();

  // Could create react router action
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    increasePushupCount(pushupCount);
    setPushupCount('');
  };

  return (
    <div className={`modal ${isOpen ? 'block' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Add Pushups</h2>
        <Form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <label htmlFor="pushupCount">Number of Pushups:</label>
          <input
            type="number"
            id="pushupCount"
            name="pushupCount"
            value={pushupCount}
            onChange={(e) => setPushupCount(e.target.value)}
            required
          />
          <button type="submit">{isLoading ? 'Loading...' : 'Add Pushups'}</button>
        </Form>
      </div>
    </div>
  );
};
