import { MouseEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { changeType, setAddType } from 'store/gridSlice';
import { extractColRow } from 'utils/grid';

export default function useGridMouseEvents() {
  const dispatch = useDispatch();

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const { row, col } = extractColRow(target.id);

      dispatch(
        setAddType({
          row,
          col,
        })
      );

      dispatch(changeType({ row, col }));
    },
    [dispatch]
  );

  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      if (e.buttons === 0) return;
      const target = e.target as HTMLElement;
      const { row, col } = extractColRow(target.id);
      dispatch(changeType({ row, col }));
    },
    [dispatch]
  );

  const handleMouseUp = useCallback((e: MouseEvent) => {}, []);

  return { handleMouseDown, handleMouseEnter, handleMouseUp };
}
