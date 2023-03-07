import { MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Node from 'components/stateful/Node';
import { useGridMouseEvents } from 'hooks';
import { setGridSize } from 'store/gridSlice';
import { RootState } from 'store/store';
import { getWindowDimensions } from 'utils/getWindowDimensions';
import { getGridSize } from 'utils/grid';
import { GridProps } from './types';

function Grid({ cellSize = 24 }: GridProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const dimensions = getWindowDimensions();

    dispatch(setGridSize(getGridSize(dimensions, cellSize)));
  }, [cellSize, dispatch]);

  const { handleMouseDown, handleMouseEnter } = useGridMouseEvents();
  const rows = useSelector((state: RootState) => state.gridStore.grid.length);
  const cols = useSelector(
    (state: RootState) => state.gridStore.grid[0]?.length || 0
  );

  if (rows === 0 || cols === 0)
    return <div>Your device is incompatible :(</div>;

  const handleContextMenu = (e: MouseEvent) => e.preventDefault();

  return (
    <div className="flex justify-center p-12 align-middle">
      <div
        className="border-grid-border select-none overflow-auto border-l border-t"
        onContextMenu={handleContextMenu}
      >
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div className="flex border-blue-400" key={rowIndex}>
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
