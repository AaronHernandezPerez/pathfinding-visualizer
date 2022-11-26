import { MouseEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setNodeType, setAddType } from 'store/gridSlice';
import { NodeType } from 'types';
import { extractColRow } from 'utils/grid';

export default function useGridMouseEvents() {
  const dispatch = useDispatch();

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      console.log({ e });

      const target = e.target as HTMLElement;
      const { row, col } = extractColRow(target.id);

      dispatch(
        setAddType({
          row,
          col,
        })
      );

      dispatch(
        setNodeType({
          row,
          col,
          forceType: e.button === 2 ? NodeType.EMPTY : undefined,
        })
      );
    },
    [dispatch]
  );

  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      if (e.buttons === 0) return;
      const target = e.target as HTMLElement;
      const { row, col } = extractColRow(target.id);

      dispatch(
        setNodeType({
          row,
          col,
          forceType: e.buttons === 2 ? NodeType.EMPTY : undefined,
        })
      );
    },
    [dispatch]
  );

  return { handleMouseDown, handleMouseEnter };
}
