import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';

import { GridProps } from './types';
import { RootState } from 'store/store';
import Node from 'components/stateful/Node';
import { useGridMouseEvents } from 'hooks';

function Grid({ cellSize }: GridProps) {
  console.log('Grid');
  const { handleMouseDown, handleMouseEnter } = useGridMouseEvents();
  const rows = useSelector((state: RootState) => state.gridStore.grid.length);
  const cols = useSelector(
    (state: RootState) => state.gridStore.grid[0]?.length || 0
  );

  if (rows === 0 || cols === 0)
    return <div>Your device is incompatible :(</div>;

  const handleContextMenu = (e: MouseEvent) => e.preventDefault();

  return (
    <div className="flex justify-center align-middle p-12">
      <div
        className="border-l border-t border-grid-border  select-none"
        onContextMenu={handleContextMenu}
      >
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div className={'flex border-blue-400'} key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Node
                key={colIndex}
                row={rowIndex}
                col={colIndex}
                size={cellSize}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
