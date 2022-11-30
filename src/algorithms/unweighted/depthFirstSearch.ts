import Stack from 'structures/Stack';
import {
  AlgorithmsParameters,
  AlgorithmsReturn,
  VisitedPath,
} from 'algorithms/types';
import { GridNode, NodeType } from 'types';
import { getConnectingNodes, getPath } from 'algorithms/utils';

/**
 * 1. Add root node to the stack.
 * 2. Loop on the stack as long as it's not empty.
 *     1. Get the node at the top of the stack(current), and remove it.
 *     2. If the first non-visited child of the current node exists, do the following:
 *         1. Check if it's the meta node, If so, then return this child node.
 *         2. Otherwise, push it to the stack.
 *     2. Else go back the visited nodes looking for a non visited child node
 * 3. If stack is empty, then meta node was not found!
 */
export default function depthFirstSearch({
  start,
  grid,
  allowDiagonals = false,
}: AlgorithmsParameters): AlgorithmsReturn {
  const searchedNodes: GridNode[] = [];
  const visitedPath: VisitedPath = {};
  const unvisited = new Stack<GridNode>();

  const firstNode = grid[start.row][start.col];
  unvisited.push(firstNode);
  // Set to null so we can check if it was visited and mark the end of the path
  visitedPath[firstNode.id] = null;

  while (!unvisited.isEmpty) {
    const node = unvisited.pop();
    searchedNodes.push(node);

    // Always select the first node
    const connectingNode = getConnectingNodes(node, grid, allowDiagonals).find(
      (n) => visitedPath[n.id] === undefined
    );

    if (!connectingNode) {
      // If no node available go back looking for new nodes
      const previousNode = visitedPath[node.id];
      if (previousNode) {
        unvisited.push(previousNode);
      }
      continue;
    }

    if (connectingNode.type === NodeType.META) {
      searchedNodes.shift();

      return {
        visitedNodes: searchedNodes,
        pathNodes: getPath(node, visitedPath),
      };
    } else {
      visitedPath[connectingNode.id] = node;
      unvisited.push(connectingNode);
    }
  }
  searchedNodes.shift();
  return { visitedNodes: searchedNodes, pathNodes: [] };
}
