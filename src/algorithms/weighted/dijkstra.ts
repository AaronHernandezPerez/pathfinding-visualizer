import {
  AlgorithmsParameters,
  AlgorithmsReturn,
  CostNode,
  WeightedVisitedPath,
} from 'algorithms/types';
import { getWeightedConnectingNodes, getWeightedPath } from 'algorithms/utils';
import PriorityQueue from 'structures/PriorityQueue';
import { GridNode, NodeType } from 'types';

const lowestCostNode = (a: CostNode, b: CostNode) => {
  return a.cost - b.cost;
};

/**
 * 1. Add root node to the queue, and mark it as visited(already explored) and a cost of 0.
 * 2. Loop on the queue as long as it's not empty.
 *   1. In every loop, choose the node with the minimum distance from the root node in the queue(root node will be selected first).
 *   2. For every non-visited child of the current node, do the following:
 *       1. Check if it's the meta node, If so, then return it.
 *       2. Otherwise, mark it as visited and push it to the queue
 *       3. Check if it has been visited or the new cost to visit is lower than before if so add it to the queue with the new cost
 * 3. If queue is empty, then meta node was not found!
 */
export default function dijkstra({
  start,
  grid,
  allowDiagonals = false,
}: AlgorithmsParameters): AlgorithmsReturn {
  const searchedNodes: GridNode[] = [];
  const visitedPath: WeightedVisitedPath = {};
  const unvisited = new PriorityQueue<CostNode>(lowestCostNode);

  const firstNode = grid[start.row][start.col];
  // Set to null so we can check if it was visited and mark the end of the path
  visitedPath[firstNode.id] = null;
  unvisited.enqueue({ node: firstNode, cost: 0 });

  while (!unvisited.isEmpty) {
    const { node, cost } = unvisited.dequeue();
    searchedNodes.push(node);
    const connectingNodes = getWeightedConnectingNodes(
      node,
      grid,
      allowDiagonals
    );

    for (const n of connectingNodes) {
      if (n.node.type === NodeType.META) {
        searchedNodes.shift();
        return {
          visitedNodes: searchedNodes,
          pathNodes: getWeightedPath(node, visitedPath),
        };
      }

      const newCost = n.cost + cost;
      if (
        visitedPath[n.node.id] === undefined ||
        visitedPath[n.node.id]?.cost > newCost
      ) {
        visitedPath[n.node.id] = { node, cost: newCost };
        unvisited.enqueue({
          node: n.node,
          cost: newCost,
        });
      }
    }
  }

  searchedNodes.shift();
  return { visitedNodes: searchedNodes, pathNodes: [] };
}
