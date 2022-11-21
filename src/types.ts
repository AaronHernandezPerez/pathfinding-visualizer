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
