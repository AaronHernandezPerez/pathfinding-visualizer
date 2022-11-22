import { memo, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useGridMouseEvents } from 'hooks';

import { GridProps } from './types';
import { RootState } from 'store/store';
import GridLattice from 'components/Grid/GridLattice';

function Grid({ cellSize }: GridProps) {
  console.log('Grid');

  const { handleMouseDown, handleMouseUp, handleMouseEnter } =
    useGridMouseEvents();

  // const rows = useSelector((state: RootState) => state.gridStore.grid.length);
  // const cols = useSelector(
  //   (state: RootState) => state.gridStore.grid[0]?.length || 0
  // );
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
        className="border-l border-t border-grid-border"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
        onMouseMove={handleMouseEnter}
      >
        <GridLattice cellSize={cellSize} cols={cols} rows={rows} />
      </div>
    </div>
  );
}

export default memo(Grid);
