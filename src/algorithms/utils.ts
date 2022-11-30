import { VisitedPath, WeightedVisitedPath } from 'algorithms/types';
import { GridNode, GridOfNodes, NodeType, RowCol } from 'types';

export const CONNECTING_STRAIGHTS = [
  { row: 1, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: -1 },
  { row: -1, col: 0 },
] as const;

export const CONNECTING_DIAGONALS = [
  { row: -1, col: 1 },
  { row: -1, col: -1 },
  { row: 1, col: -1 },
  { row: 1, col: 1 },
] as const;

function validNode(node: GridNode) {
  return node && node.type !== NodeType.WALL;
}

function getGridNode(position: RowCol, node: GridNode, grid: GridOfNodes) {
  return grid[node.row + position.row]?.[node.col + position.col];
}

export function getConnectingNodes(
  node: GridNode,
  grid: GridOfNodes,
  allowDiagonals = false
) {
  const nodes: GridNode[] = [];
  const allowedNodes = allowDiagonals
    ? [...CONNECTING_STRAIGHTS, ...CONNECTING_DIAGONALS]
    : CONNECTING_STRAIGHTS;

  allowedNodes.forEach((position) => {
    const connectedNode = getGridNode(position, node, grid);

    if (validNode(connectedNode)) nodes.push(connectedNode);
  });

  return nodes;
}

export function getPath(lastNode: GridNode, visitedPath: VisitedPath) {
  const pathNodes = [lastNode];
  let currentNode: GridNode | null = lastNode;
  do {
    const previousNode: GridNode | null = visitedPath[currentNode.id];
    if (previousNode) {
      pathNodes.push(previousNode);
    }
    currentNode = previousNode;
  } while (currentNode);

  // The last element will always be the start node
  pathNodes.pop();
  return pathNodes.reverse();
}

export function getWeightedConnectingNodes(
  node: GridNode,
  grid: GridOfNodes,
  allowDiagonals = false
) {
  const nodes: Array<{ node: GridNode; cost: number }> = [];

  CONNECTING_STRAIGHTS.forEach((position) => {
    const connectedNode = getGridNode(position, node, grid);
    if (validNode(connectedNode)) {
      nodes.push({ node: connectedNode, cost: 1 });
    }
  });
  if (allowDiagonals) {
    CONNECTING_DIAGONALS.forEach((position) => {
      const connectedNode = getGridNode(position, node, grid);
      if (validNode(connectedNode)) {
        nodes.push({ node: connectedNode, cost: Math.SQRT2 });
      }
    });
  }

  return nodes;
}

export function getWeightedPath(
  lastNode: GridNode,
  visitedPath: WeightedVisitedPath
) {
  const pathNodes = [lastNode];
  let currentNode: GridNode | null | undefined = lastNode;
  do {
    const previousNode: GridNode | null | undefined =
      visitedPath[currentNode.id]?.node;
    if (previousNode) {
      pathNodes.push(previousNode);
    }
    currentNode = previousNode;
  } while (currentNode);

  // The last element will always be the start node
  pathNodes.pop();
  return pathNodes.reverse();
}

export function getHeuristicDistance(
  start: RowCol,
  end: RowCol,
  allowDiagonals = false
) {
  return Math.abs(end.row - start.row) + Math.abs(end.col - start.col);
}
