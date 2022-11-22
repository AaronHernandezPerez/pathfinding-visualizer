export enum NodeType {
  START,
  WALL,
  META,
  EMPTY,
}

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


export interface GridReturn {
  grid: GridNode[][];
  start: RowCol;
  meta: RowCol;
}