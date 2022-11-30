import { GridNode, GridOfNodes, RowCol } from 'types';

export interface AlgorithmsReturn {
  visitedNodes: GridNode[];
  pathNodes: GridNode[];
}

export interface AlgorithmsParameters {
  start: RowCol;
  grid: GridOfNodes;
  allowDiagonals: boolean;
  meta: RowCol;
}
export type AlgorithmsSignature = (
  arg: AlgorithmsParameters
) => AlgorithmsReturn;

export interface VisitedPath {
  [key: string]: GridNode | null;
}

export interface CostNode {
  node: GridNode;
  cost: number;
}

export interface CostHeuristicNode extends CostNode {
  costToMeta: number;
}

export interface WeightedVisitedPath {
  [key: string]: CostNode | null;
}
