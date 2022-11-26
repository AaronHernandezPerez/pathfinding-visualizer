import { GridNode, RowCol } from 'types';

function dijkstras(start: RowCol, grid: GridNode[][]) {
  const visited = [];
  const unvisited = [];

  visited.push(grid[start.row][start.col]);
}
