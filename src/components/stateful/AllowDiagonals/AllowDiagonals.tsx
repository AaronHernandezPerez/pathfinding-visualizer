import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from 'components/atoms/Checkbox/Checkbox';
import { toggleAllowDiagonals } from 'store/gridSlice';
import { AppDispatch, RootState } from 'store/store';

export default function AllowDiagonals() {
  const dispatch = useDispatch<AppDispatch>();
  const allowDiagonals = useSelector(
    (state: RootState) => state.gridStore.allowDiagonals
  );

  const setDiagonals = () => dispatch(toggleAllowDiagonals());

  return (
    <Checkbox
      id="allow-diagonals"
      label="Allow diagonals"
      checked={allowDiagonals}
      onChange={setDiagonals}
    />
  );
}
