import PriorityQueue from 'structures/PriorityQueue';
import {
  AlgorithmsParameters,
  AlgorithmsReturn,
  CostHeuristicNode,
  WeightedVisitedPath,
} from 'algorithms/types';
import {
  getHeuristicDistance,
  getWeightedConnectingNodes,
  getWeightedPath,
} from 'algorithms/utils';
import { GridNode, NodeType } from 'types';

const lowestCostNode = (a: CostHeuristicNode, b: CostHeuristicNode) => {
  return a.costToMeta - b.costToMeta;
};

/**
 * 1. Assign cost[start] = 0.
 * 2. Add start node to priority queue.
 * 3. Loop on the queue as long as it's not empty.
 *    1. In every loop, choose the node with the minimum distance from the start node in the queue + heuristic (start node will be selected first).
 *    2. Remove the current chosen node from the queue.
 *    4. For every child of the current node, do the following:
 *        1. Check if it's the meta node, If so, then return this child node.
 *        1. Assign newCostToMeta = distance(start, current) + distance(current, child) + heuristic(child, meta).
 *        2. If cost < cost[child], then, assign dist[child] = cost. This denotes a shorter path to child node has been found.
 *            1. Add child node to the queue.
 * 4. If queue is empty, then meta node was not found!
 */
export default function aStar({
  start,
  grid,
  meta,
  allowDiagonals = false,
}: AlgorithmsParameters): AlgorithmsReturn {
  const searchedNodes: GridNode[] = [];
  const visitedPath: WeightedVisitedPath = {};
  const unvisited = new PriorityQueue<CostHeuristicNode>(lowestCostNode);

  const firstNode = grid[start.row][start.col];
  // Set to null so we can check if it was visited and mark the end of the path
  visitedPath[firstNode.id] = null;
  unvisited.enqueue({ node: firstNode, cost: 0, costToMeta: 0 });

  while (!unvisited.isEmpty) {
    const { node, cost } = unvisited.dequeue();
    const connectingNodes = getWeightedConnectingNodes(
      node,
      grid,
      allowDiagonals
    );
    searchedNodes.push(node);

    for (const n of connectingNodes) {
      if (n.node.type === NodeType.META) {
        searchedNodes.shift();
        return {
          visitedNodes: searchedNodes,
          pathNodes: getWeightedPath(node, visitedPath),
        };
      }
      const newCost = n.cost + cost;

      const newCostToMeta =
        newCost +
        getHeuristicDistance({ row: n.node.row, col: n.node.col }, meta);

      if (
        visitedPath[n.node.id] === undefined ||
        visitedPath[n.node.id]?.cost > newCost
      ) {
        visitedPath[n.node.id] = { node, cost: newCost };
        unvisited.enqueue({
          node: n.node,
          cost: newCost,
          costToMeta: newCostToMeta,
        });
      }
    }
  }

  searchedNodes.shift();
  return { visitedNodes: searchedNodes, pathNodes: [] };
}
