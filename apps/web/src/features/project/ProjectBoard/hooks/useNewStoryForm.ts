import { useState } from 'react';

export const useNewStoryForm = () => {
  const [formOpened, setOpenedForm] = useState(false);
  const openForm = () => {
    setOpenedForm(true);
  };
  const closeForm = () => {
    setOpenedForm(false);
  };

  return {
    formOpened,
    openForm,
    closeForm,
  };
};
