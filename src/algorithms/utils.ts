import { GridNode, NodeType } from 'types';

const CONNECTING_STRAIGHTS = [
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 0, col: -1 },
  { row: -1, col: 0 },
] as const;

const CONNECTING_DIAGONALS = [
  ...CONNECTING_STRAIGHTS,
  { row: -1, col: 1 },
  { row: -1, col: -1 },
  { row: 1, col: -1 },
  { row: 1, col: 1 },
] as const;

export function getConnectingNodes(
  node: GridNode,
  grid: GridNode[][],
  allowDiagonals = false
) {
  const nodes: GridNode[] = [];
  const allowedNodes = allowDiagonals
    ? CONNECTING_DIAGONALS
    : CONNECTING_STRAIGHTS;

  allowedNodes.forEach((position) => {
    const connectedNode =
      grid[node.row + position.row]?.[node.col + position.col];

    if (connectedNode && connectedNode.type !== NodeType.WALL)
      nodes.push(connectedNode);
  });

  return nodes;
}

// export function getNodePath(params:type) {

// }
