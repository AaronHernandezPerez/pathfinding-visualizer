import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGridMouseEvents } from 'hooks';
import { GridStatus } from 'store/gridSlice';
import { RootState } from 'store/store';
import { NodeType } from 'types';
import { joinClasses } from 'utils/classes';
import { NodeProps } from './types';

const internalTypeStyles = {
  [NodeType.START]: 'bg-grid-start',
  [NodeType.META]: 'bg-grid-meta',
  [NodeType.EMPTY]: '',
  [NodeType.WALL]: 'bg-grid-wall',
  [NodeType.VISITED]: 'bg-grid-visited',
  [NodeType.PATH]: 'bg-grid-path',
} as const;

const animationStyles = {
  [NodeType.START]: '',
  [NodeType.META]: '',
  [NodeType.EMPTY]: '',
  [NodeType.WALL]: '',
  [NodeType.VISITED]: 'animate-node-visited',
  [NodeType.PATH]: 'animate-node-path',
};

const typeStyles = {
  [NodeType.START]: '',
  [NodeType.META]: '',
  [NodeType.EMPTY]: '',
  [NodeType.WALL]: 'border-grid-wall border-none',
  [NodeType.VISITED]: '',
  [NodeType.PATH]: '',
} as const;

/**
 * Instead of passing the node directly, we are getting the index of the node from the grid,
 * and then getting the node from the grid. This is because the grid is a 2D array
 * and we want to avoid re-rendering the entire grid when a single node changes.
 */
function Node({ size, row, col }: NodeProps) {
  const status = useSelector((state: RootState) => state.gridStore.status);
  const allowDiagonals = useSelector(
    (state: RootState) => state.gridStore.allowDiagonals
  );
  const node = useSelector(
    (state: RootState) => state.gridStore.grid[row][col]
  );
  const { handleMouseDown, handleMouseEnter } = useGridMouseEvents(node);

  const style = {
    height: size,
    minWidth: size,
    width: size,
    marginTop: -1,
    marginLeft: -1,
    borderRadius:
      allowDiagonals && node.type === NodeType.WALL ? '40%' : undefined,
    overflow: 'hidden',
  };

  const animationClass =
    status === GridStatus.ANIMATING ? animationStyles[node.type] : '';

  return (
    <div
      onPointerDown={handleMouseDown}
      onPointerEnter={handleMouseEnter}
      className={joinClasses(
        'will-change-border border-grid-border border',
        typeStyles[node.type]
      )}
      style={style}
    >
      <div
        className={joinClasses(
          'will-change-node-animation pointer-events-none h-full',
          internalTypeStyles[node.type],
          animationClass
        )}
      ></div>
    </div>
  );
}

export default memo(Node);
