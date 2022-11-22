import { WindowDimensions } from 'hooks';
import { GridNode, GridReturn, NodeType, RowCol } from 'types';

function validDimensions({ height, width }: WindowDimensions) {
  if (height < 4 || width < 4) return false;
  return true;
}

export function getGridSize(
  { width, height }: WindowDimensions,
  cellSize: number,
  margin = 4
) {
  return {
    width: Math.floor(width / cellSize) - margin,
    height: Math.floor((height - 64) / cellSize) - margin,
  };
}

export function createGrid({
  height,
  width,
}: WindowDimensions): // start: RowCol,
// meta: RowCol
GridReturn {
  const grid: GridNode[][] = [];

  if (!validDimensions({ height, width }))
    return { grid, start: { row: 0, col: 0 }, meta: { row: 0, col: 0 } };

  for (let row = 0; row < height; row++) {
    grid[row] = Array.from({ length: width }, (_, index): GridNode => {
      return { id: `${row}-${index}`, row, col: index, type: NodeType.EMPTY };
    });
  }

  // Set start and meta
  const middleHeight = Math.floor(height / 2);
  const quarterWidth = Math.floor(width / 4);

  const startRowCol = { row: middleHeight, col: quarterWidth };
  const metaRowCol = { row: middleHeight, col: width - quarterWidth - 1 };

  grid[startRowCol.row][startRowCol.col].type = NodeType.START;
  grid[metaRowCol.row][metaRowCol.col].type = NodeType.META;
  return { grid, start: startRowCol, meta: metaRowCol };
}

export function extractColRow(id: string) {
  const [row, col] = id.split('-');

  return { row: parseInt(row), col: parseInt(col) };
}

function repositionNode(
  { height, width }: Partial<WindowDimensions>,
  nodePosition: RowCol
) {
  const newPosition = { ...nodePosition };
  if (height && height < nodePosition.row) {
    newPosition.row = height;
  }
  if (width && width < nodePosition.col) {
    newPosition.col = width;
  }

  return newPosition;
}

/**
 * Contains side effects for @param grid
 */
function resizeHeight(
  { height, width }: WindowDimensions,
  grid: GridNode[][],
  start: RowCol,
  meta: RowCol
): GridReturn {
  const length = grid.length;
  if (height < length) {
    grid = grid.slice(0, height);
    start = repositionNode({ height }, start);
    meta = repositionNode({ height }, meta);
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

  return { grid, start, meta };
}

/**
 * Contains side effects for @param grid
 */
function resizeWidth(
  { width }: WindowDimensions,
  grid: GridNode[][],
  start: RowCol,
  meta: RowCol
): GridReturn {
  const length = grid.length;
  const colLength = grid[0].length;
  if (width < colLength) {
    for (let row = 0; row < length; row++) {
      grid[row] = grid[row].slice(0, width);
    }
    start = repositionNode({ width }, start);
    meta = repositionNode({ width }, meta);
  } else if (width > colLength) {
    const colDiff = width - colLength;
    for (let row = 0; row < length; row++) {
      grid[row].push(
        ...Array.from({ length: colDiff }, (_, index): GridNode => {
          return {
            id: `${row}-${colLength + index}`,
            row,
            col: colLength + index,
            type: NodeType.EMPTY,
          };
        })
      );
    }
  }

  return { grid, start, meta };
}

export function resizeGrid(
  dimensions: WindowDimensions,
  grid: GridNode[][],
  start: RowCol,
  meta: RowCol
): GridReturn {
  if (!validDimensions(dimensions)) return { grid, start, meta };

  let newGrid = resizeHeight(dimensions, grid, start, meta);
  newGrid = resizeWidth(dimensions, newGrid.grid, start, meta);

  return newGrid;
}
