import { GridNode, GridOfNodes, NodeType, RowCol } from 'types';
import { WindowDimensions } from './getWindowDimensions';

/* 
I tried to have as little side effects as possible, but in the case of the grid,
it was more efficient to work with the array in place
 */

export interface GridReturn {
  grid: GridOfNodes;
  start: RowCol;
  meta: RowCol;
}

function validDimensions({ height, width }: WindowDimensions) {
  if (height < 4 || width < 4) return false;
  return true;
}

export function getGridSize(
  { width, height }: WindowDimensions,
  cellSize: number,
  heightOffset = 128,
  margin = 4
) {
  return {
    width: Math.floor(width / cellSize) - margin,
    height: Math.floor((height - heightOffset) / cellSize) - margin,
  };
}

export function createGrid({ height, width }: WindowDimensions): GridReturn {
  const grid: GridOfNodes = [];

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
  nodePosition: RowCol,
  invalidPosition: RowCol
) {
  const newPosition = { ...nodePosition };

  if (height && height <= nodePosition.row) {
    let newRowPosition = height - 1;
    if (newRowPosition === invalidPosition.row) {
      newRowPosition--;
    }
    newPosition.row = newRowPosition;
  }
  if (width && width <= nodePosition.col) {
    let newColPosition = width - 1;
    if (newColPosition === invalidPosition.col) {
      newColPosition--;
    }
    newPosition.col = newColPosition;
  }

  return newPosition;
}

/**
 * Contains side effects for @param grid
 */
function validateSpecialNodes(
  dimensions: Partial<WindowDimensions>,
  grid: GridOfNodes,
  start: RowCol,
  meta: RowCol
) {
  start = repositionNode(dimensions, start, meta);
  meta = repositionNode(dimensions, meta, start);
  grid[start.row][start.col].type = NodeType.START;
  grid[meta.row][meta.col].type = NodeType.META;

  return { start, meta };
}

/**
 * Contains side effects for @param grid
 */
function resizeHeight(
  { height, width }: WindowDimensions,
  grid: GridOfNodes,
  start: RowCol,
  meta: RowCol
): GridReturn {
  const length = grid.length;
  if (height < length) {
    grid = grid.slice(0, height);
    const { start: validatedStart, meta: validatedMeta } = validateSpecialNodes(
      { width },
      grid,
      start,
      meta
    );
    start = validatedStart;
    meta = validatedMeta;
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
  grid: GridOfNodes,
  start: RowCol,
  meta: RowCol
): GridReturn {
  const length = grid.length;
  const colLength = grid[0].length;
  if (width < colLength) {
    for (let row = 0; row < length; row++) {
      grid[row] = grid[row].slice(0, width);
    }
    const { start: validatedStart, meta: validatedMeta } = validateSpecialNodes(
      { width },
      grid,
      start,
      meta
    );
    start = validatedStart;
    meta = validatedMeta;
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

/**
 * Contains side effects for @param grid
 */
export function resizeGrid(
  dimensions: WindowDimensions,
  grid: GridOfNodes,
  start: RowCol,
  meta: RowCol
): GridReturn {
  if (!validDimensions(dimensions)) return { grid, start, meta };

  let newGrid = resizeHeight(dimensions, grid, start, meta);
  newGrid = resizeWidth(dimensions, newGrid.grid, newGrid.start, newGrid.meta);

  return newGrid;
}
