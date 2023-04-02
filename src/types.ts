export enum NodeType {
  START = 'start',
  EMPTY = 'empty',
  WALL = 'wall',
  VISITED = 'visited',
  PATH = 'path',
  META = 'meta',
}

export type GridOfNodes = GridNode[][];

export interface GridNode {
  id: string;
  type: NodeType;
  row: number;
  col: number;
}

export interface RowCol {
  row: number;
  col: number;
}
