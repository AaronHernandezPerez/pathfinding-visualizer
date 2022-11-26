import { AlgorithmsReturn } from 'algorithms/types';
import { getConnectingNodes } from 'algorithms/utils';
import Queue from 'structures/Queue';
import { GridNode, NodeType, RowCol } from 'types';

interface VisitedPath {
  [key: string]: GridNode | null;
}

/**
 * 1. Add root node to the queue, and mark it as visited(already explored).
 * 2. Loop on the queue as long as it's not empty.
 *   1. Get and remove the node at the top of the queue(current).
 *   2. Mark it as visited
 *   3. For every non-visited child of the current node, do the following:
 *       1. Mark it as visited.
 *       2. Check if it's the meta node, If so, then return it.
 *       3. Otherwise, push it to the queue if it has not been visited.
 * 3. If queue is empty, then meta node was not found!
 */
export default function breadthFirstSearch(
  start: RowCol,
  grid: GridNode[][]
): AlgorithmsReturn {
  const visitedNodes: GridNode[] = [];
  const visitedPath: VisitedPath = {};
  const unvisited = new Queue<GridNode>();

  const firstNode = grid[start.row][start.col];
  unvisited.enqueue(firstNode);
  // Set to null so we can check if it was visited and mark the end of the path
  visitedPath[firstNode.id] = null;

  while (!unvisited.isEmpty) {
    const node = unvisited.dequeue();
    const connectingNodes = getConnectingNodes(node, grid);

    for (const n of connectingNodes) {
      if (n.type === NodeType.META) {
        return { visitedNodes, pathNodes: getPath(node, visitedPath) };
      } else if (visitedPath[n.id] === undefined) {
        visitedPath[n.id] = node;
        visitedNodes.push(n);
        unvisited.enqueue(n);
      }
    }
  }
  return { visitedNodes, pathNodes: [] };
}

function getPath(lastNode: GridNode, visitedNodes: VisitedPath) {
  const pathNodes = [lastNode];
  let currentNode: GridNode | null = lastNode;
  do {
    const previousNode: GridNode | null = visitedNodes[currentNode.id];
    if (previousNode) {
      pathNodes.push(previousNode);
    }
    currentNode = previousNode;
  } while (currentNode);

  // The last element will always be the start node
  pathNodes.pop();
  return pathNodes.reverse();
}
