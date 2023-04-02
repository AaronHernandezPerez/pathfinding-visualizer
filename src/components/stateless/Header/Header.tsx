import { useState } from 'react';

import { Bars4Icon } from '@heroicons/react/20/solid';
import { joinClasses } from 'utils/classes';
import { HeaderProps } from './types';

export default function Header({ title, children }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu((state) => !state);
  return (
    <div>
      <div className="flex h-16 items-center bg-blue-700 px-4 sm:px-6">
        <div className="grow md:grow-0">{title}</div>
        <div className="hidden grow justify-end text-white md:flex">
          {children}
        </div>
        <div className="p-3 md:hidden" onClick={toggleMenu}>
          <Bars4Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className={joinClasses(' md:hidden', openMenu ? 'block' : 'hidden')}>
        <div className="w-full bg-gray-200 py-2 px-4">{children}</div>
      </div>
    </div>
  );
}
