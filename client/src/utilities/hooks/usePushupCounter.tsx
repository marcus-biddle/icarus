import { useState } from 'react';
import { pushupActions } from '../../api/pushups';

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
      const response = await pushupActions.addPushups(count);
      if (response) {
        setIsLoading(false);
        closeModal();
        return true;
      }
    } catch (error) {
      console.error('Error adding pushups:', error);
    }

    return false;
  };

  return { isLoading, isModalOpen, openModal, closeModal, increasePushupCount };
};
