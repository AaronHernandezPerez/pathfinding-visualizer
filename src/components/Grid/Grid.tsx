import Node from 'components/Node';
import { GridProps } from './types';

export default function Grid({ grid, cellSize }: GridProps) {
  if (grid.length === 0 || grid[0].length === 0)
    return <div>Your device is incompatible :(</div>;
  return (
    <div className="flex justify-center align-middle p-12">
      <div className="border-l border-t border-grid-border">
        {grid.map((row, rowIndex) => (
          <div className={'flex   border-blue-400'} key={rowIndex}>
            {row.map((gridNode) => (
              <Node key={gridNode.id} size={cellSize} {...gridNode} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
