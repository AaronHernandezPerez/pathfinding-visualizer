import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { GridStatus } from 'store/gridSlice';
import { RootState } from 'store/store';
import { NodeType } from 'types';
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
  [NodeType.WALL]: 'border-grid-wall',
  [NodeType.VISITED]: '',
  [NodeType.PATH]: '',
} as const;

function Node({
  size,
  row,
  col,
  handleMouseDown,
  handleMouseEnter,
}: NodeProps) {
  const status = useSelector((state: RootState) => state.gridStore.status);
  const { id, type } = useSelector(
    (state: RootState) => state.gridStore.grid[row][col]
  );

  const style = useMemo(
    () => ({ height: size, minWidth: size, width: size }),
    [size]
  );
  const animationClass = useMemo(
    () => (status === GridStatus.ANIMATING ? animationStyles[type] : ''),
    [status, type]
  );

  return (
    <div
      onPointerDown={handleMouseDown}
      onPointerEnter={handleMouseEnter}
      id={id}
      className={`will-change-border-color border-grid-border border-r border-b ${typeStyles[type]}`}
      style={style}
    >
      <div
        className={`will-change-node-animation pointer-events-none h-full ${internalTypeStyles[type]} ${animationClass}`}
      ></div>
    </div>
  );
}

export default memo(Node);
