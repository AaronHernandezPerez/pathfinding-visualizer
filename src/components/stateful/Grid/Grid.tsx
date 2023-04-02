import { MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Node from 'components/stateful/Node';
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

  const grid = useSelector((state: RootState) => state.gridStore.grid);

  if (!grid.length) return <div>Your device is incompatible :(</div>;

  const handleContextMenu = (e: MouseEvent) => e.preventDefault();

  return (
    <div className="flex justify-center p-6 align-middle md:p-12">
      <div
        className="border-grid-border select-none overflow-auto border-l border-t"
        onContextMenu={handleContextMenu}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((node) => (
              <Node key={node.id} node={node} size={cellSize} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
