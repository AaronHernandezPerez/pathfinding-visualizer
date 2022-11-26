import { memo, useMemo } from 'react';
import { useGridMouseEvents } from 'hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { NodeType } from 'types';
import { NodeProps } from './types';

const internalTypeStyles = {
  [NodeType.START]: 'bg-grid-start',
  [NodeType.META]: 'bg-grid-meta',
  [NodeType.EMPTY]: '',
  [NodeType.WALL]: 'bg-grid-wall',
  [NodeType.VISITED]: 'bg-grid-visited animate-node-visited',
  [NodeType.PATH]: 'bg-grid-path animate-node-path',
} as const;

const typeStyles = {
  [NodeType.START]: '',
  [NodeType.META]: '',
  [NodeType.EMPTY]: '',
  [NodeType.WALL]: 'border-grid-wall',
  [NodeType.VISITED]: '',
  [NodeType.PATH]: '',
} as const;

function Node({ size, row, col }: NodeProps) {
  // console.log('Node', row, col);
  const { handleMouseDown, handleMouseEnter } = useGridMouseEvents();
  const style = useMemo(() => ({ height: size, width: size }), [size]);

  const { id, type } = useSelector(
    (state: RootState) => state.gridStore.grid[row][col]
  );

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      id={id}
      className={'border-r border-b border-grid-border ' + typeStyles[type]}
      style={style}
    >
      <div
        className={'pointer-events-none h-full ' + internalTypeStyles[type]}
      ></div>
    </div>
  );
}

export default memo(Node);
