import { useState } from 'react';
import { pointsActions } from '../../api/points';
import { eventActions } from '../../api/events';

export const useEventModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateEventCount = async ({ eventCount, eventName }: { eventCount: string, eventName: string }) => {
    setIsLoading(true);
    let count = parseInt(eventCount);
    if (isNaN(count)) count = 0;

    try {
      const eventResponse = await eventActions.updateEvent({eventName: eventName, eventCount: count});
      // const expRes = await pointsActions.addPoints(count);
      if (eventResponse) {
        setIsLoading(false);
        closeModal();
        console.log(eventResponse);
        // window.location.reload();
        return true;
      }
    } catch (error) {
      console.error('Error adding pushups:', error);
    }

    return false;
  };

  return { isLoading, isModalOpen, openModal, closeModal, updateEventCount };
};
