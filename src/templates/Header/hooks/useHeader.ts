import { useState } from 'react';

export const useHeader = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return { openMenu, setOpenMenu };
};
