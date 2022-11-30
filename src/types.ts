export enum NodeType {
  START,
  EMPTY,
  WALL,
  VISITED,
  PATH,
  META,
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
