import {
  AlgorithmsParameters,
  AlgorithmsReturn,
  VisitedPath,
} from 'algorithms/types';
import { getConnectingNodes, getPath } from 'algorithms/utils';
import Queue from 'structures/Queue';
import { GridNode, NodeType } from 'types';

/**
 * 1. Add root node to the queue, and mark it as visited(already explored).
 * 2. Loop on the queue as long as it's not empty.
 *   1. Get and remove the node at the top of the queue(current).
 *   2. For every non-visited child of the current node, do the following:
 *       1. Check if it's the meta node, If so, then return it.
 *       2. Otherwise, mark it as visited and push it to the queue if it has not been visited.
 * 3. If queue is empty, then meta node was not found!
 */
export default function breadthFirstSearch({
  start,
  grid,
  allowDiagonals = false,
}: AlgorithmsParameters): AlgorithmsReturn {
  const searchedNodes: GridNode[] = [];
  const visitedPath: VisitedPath = {};
  const unvisited = new Queue<GridNode>();

  const firstNode = grid[start.row][start.col];
  unvisited.enqueue(firstNode);
  // Set to null so we can check if it was visited and mark the end of the path
  visitedPath[firstNode.id] = null;

  while (!unvisited.isEmpty) {
    const node = unvisited.dequeue();
    searchedNodes.push(node);
    const connectingNodes = getConnectingNodes(node, grid, allowDiagonals);

    for (const n of connectingNodes) {
      if (n.type === NodeType.META) {
        searchedNodes.shift();
        return {
          visitedNodes: searchedNodes,
          pathNodes: getPath(node, visitedPath),
        };
      } else if (visitedPath[n.id] === undefined) {
        visitedPath[n.id] = node;
        unvisited.enqueue(n);
      }
    }
  }

  searchedNodes.shift();
  return { visitedNodes: searchedNodes, pathNodes: [] };
}
