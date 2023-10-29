import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import './style.css';

interface PushupModalProps {
  isOpen: boolean;
  isLoading: boolean
  onClose: () => void;
  onAddPushups: (pushupCount: string) => void;
}

export const PushupModal= ({ isOpen, isLoading, onClose, onAddPushups }: PushupModalProps) => {
  const [pushupCount, setPushupCount] = useState<string>('');

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddPushups(pushupCount);
    setPushupCount('');
  };

  return (
    <div className={`modal ${isOpen ? 'block' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
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
