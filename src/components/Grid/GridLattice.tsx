import { GridLatticeProps } from 'components/Grid/types';
import Node from 'components/Node';
import { memo } from 'react';
function GridLattice({ rows, cols, cellSize }: GridLatticeProps) {
  console.log('GridLattice');
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div className={'flex border-blue-400'} key={rowIndex}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Node
              key={colIndex}
              row={rowIndex}
              col={colIndex}
              size={cellSize}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default memo(GridLattice);
