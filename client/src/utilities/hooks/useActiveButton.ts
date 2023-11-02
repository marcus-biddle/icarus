import { useState } from 'react';

export const useActiveButton = (initialActiveButton: string) => {
  const [activeButton, setActiveButton] = useState(initialActiveButton);

  const activateButton = (buttonName: string) => {
    setActiveButton(buttonName);
    // Add data filtering here?
  };

  return { activeButton, activateButton };
};
