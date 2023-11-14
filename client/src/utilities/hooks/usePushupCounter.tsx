import { useState } from 'react';
import { pushupActions } from '../../api/pushups';
import { pointsActions } from '../../api/points';

export const usePushupCounter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log('openModal', isModalOpen)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const increasePushupCount = async (pushupCount: string) => {
    setIsLoading(true);
    let count = parseInt(pushupCount);
    if (isNaN(count)) count = 0;

    try {
      const pushupRes = await pushupActions.addPushups(count);
      const expRes = await pointsActions.addPoints(count);
      if (pushupRes && expRes) {
        setIsLoading(false);
        closeModal();
        window.location.reload();
        return true;
      }
    } catch (error) {
      console.error('Error adding pushups:', error);
    }

    return false;
  };

  return { isLoading, isModalOpen, openModal, closeModal, increasePushupCount };
};
