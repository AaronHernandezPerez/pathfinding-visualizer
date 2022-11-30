import PriorityQueue from 'structures/PriorityQueue';
import {
  AlgorithmsParameters,
  AlgorithmsReturn,
  CostNode,
  WeightedVisitedPath,
} from 'algorithms/types';
import {
  getHeuristicDistance,
  getWeightedConnectingNodes,
  getWeightedPath,
} from 'algorithms/utils';
import { GridNode, NodeType } from 'types';

const lowestCostNode = (a: CostNode, b: CostNode) => {
  return a.cost - b.cost;
};

/**
 * 1. Assign cost[start] = 0.
 * 2. Add root node to priority queue.
 * 3. Loop on the queue as long as it's not empty.
 *    1. In every loop, choose the node with the minimum heuristic distance from the meta node in the queue(root node will be selected first).
 *    2. Remove the current chosen node from the queue.
 *    3. For every child of the current node, do the following:
 *        1. Check if it's the meta node, If so, then return this child node.
 *        3. Assign cost[current] = cost + heuristics(current, meta).
 *        4. Add child node to the queue.
 * 4. If queue is empty, then meta node was not found!
 */
export default function greedyBestFirstSearch({
  start,
  grid,
  meta,
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
    const { node } = unvisited.dequeue();
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
      const newCost =
        getHeuristicDistance({ row: n.node.row, col: n.node.col }, meta) +
        n.cost;

      if (visitedPath[n.node.id] === undefined) {
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
