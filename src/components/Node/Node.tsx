import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { NodeType } from 'types';
import { NodeProps } from './types';

const typeStyles = {
  [NodeType.START]: 'bg-grid-start',
  [NodeType.META]: 'bg-grid-meta',
  [NodeType.EMPTY]: '',
  [NodeType.WALL]: 'bg-grid-wall',
};

export default function Node({ size, row, col }: NodeProps) {
  console.log('Node', row, col);
  const { id, type } = useSelector(
    (state: RootState) => state.gridStore.grid[row][col]
  );

  return (
    <div
      id={id}
      className={
        'border-r border-b border-grid-border select-none ' + typeStyles[type]
      }
      style={{ height: size, width: size }}
    ></div>
  );
}
