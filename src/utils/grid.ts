import { WindowDimensions } from 'hooks';
import { GridNode, NodeType } from 'types';

function validDimensions({ height, width }: WindowDimensions) {
  if (height < 4 || width < 4) return false;
  return true;
}

export function getSizes(
  { width, height }: WindowDimensions,
  cellSize: number,
  margin = 4
) {
  return {
    width: Math.floor(width / cellSize) - margin,
    height: Math.floor((height - 64) / cellSize) - margin,
  };
}

export function createGrid({ height, width }: WindowDimensions): GridNode[][] {
  const grid: GridNode[][] = [];

  if (!validDimensions({ height, width })) return grid;

  for (let row = 0; row < height; row++) {
    grid[row] = Array.from({ length: width }, (_, index): GridNode => {
      return { id: `${row}-${index}`, row, col: index, type: NodeType.EMPTY };
    });
  }

  // Set start and meta

  const middleHeight = Math.floor(height / 2);
  const quarterWidth = Math.floor(width / 4);

  grid[middleHeight][quarterWidth].type = NodeType.START;
  grid[middleHeight][width - quarterWidth - 1].type = NodeType.META;
  return grid;
}

/**
 * Contains side effects for @param grid
 */
function resizeHeight({ height, width }: WindowDimensions, grid: GridNode[][]) {
  const length = grid.length;
  if (height < length) {
    grid = grid.slice(0, height);
  } else if (height > length) {
    for (let row = length - 1; row < height; row++) {
      grid.push(
        Array.from({ length: width }, (_, index): GridNode => {
          return {
            id: `${row}-${index}`,
            row,
            col: index,
            type: NodeType.EMPTY,
          };
        })
      );
    }
  }

  return grid;
}

/**
 * Contains side effects for @param grid
 */
function resizeWidth({ width }: WindowDimensions, grid: GridNode[][]) {
  const length = grid.length;
  const colLength = grid[0].length;
  if (width < colLength) {
    for (let row = 0; row < length; row++) {
      grid[row] = grid[row].slice(0, width);
    }
  } else if (width > colLength) {
    const colDiff = width - colLength;
    for (let row = 0; row < length; row++) {
      grid[row].push(
        ...Array.from({ length: colDiff }, (_, index): GridNode => {
          return {
            id: `${length + row - 1}-${colLength + index}`,
            row: length + row,
            col: colLength + index,
            type: NodeType.EMPTY,
          };
        })
      );
    }
  }

  return grid;
}

// TODO: detect start and meta nodes
export function resizeGrid(
  dimensions: WindowDimensions,
  grid: GridNode[][]
): GridNode[][] {
  if (!validDimensions(dimensions)) return grid;

  let newGrid = resizeHeight(dimensions, structuredClone(grid));
  newGrid = resizeWidth(dimensions, newGrid);

  return newGrid;
}
