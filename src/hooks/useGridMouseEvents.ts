import { MouseEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { cleanGrid, setAddType, setNodeType } from 'store/gridSlice';
import { GridNode, NodeType } from 'types';

export default function useGridMouseEvents(node: GridNode) {
  const dispatch = useDispatch();

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      const { row, col } = node;

      dispatch(cleanGrid());

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
    [dispatch, node]
  );

  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      if (e.buttons === 0) return;
      const { row, col } = node;

      dispatch(
        setNodeType({
          row,
          col,
          forceType: e.buttons === 2 ? NodeType.EMPTY : undefined,
        })
      );
    },
    [dispatch, node]
  );

  return { handleMouseDown, handleMouseEnter };
}
