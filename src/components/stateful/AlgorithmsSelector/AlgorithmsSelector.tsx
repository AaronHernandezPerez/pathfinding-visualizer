import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from 'store/store';
import { aStar, dijkstra, greedyBestFirstSearch } from 'algorithms/weighted';
import { breadthFirstSearch, depthFirstSearch } from 'algorithms/unweighted';
import { animateResult, cleanGrid, setDirty, setNode } from 'store/gridSlice';
import Button from 'components/atoms/Buttons/Button';
import Checkbox from 'components/atoms/Checkbox';
import { AlgorithmsSignature } from 'algorithms/types';
import { GridNode, NodeType } from 'types';

const colorNodes = async (
  visitedNodes: GridNode[],
  type: NodeType,
  dispatch: Dispatch
) =>
  await new Promise<void>((resolve) => {
    let i = 0;
    const animate = () => {
      const node = visitedNodes[i];
      dispatch(
        setNode({
          row: node.row,
          col: node.col,
          node: { type },
        })
      );

      i++;
      if (i !== visitedNodes.length) {
        // setTimeout(() => {
        window.requestAnimationFrame(animate);
        // }, 200);
      } else {
        resolve();
      }
    };
    animate();
  });

export default function AlgorithmsSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const [diagonals, setDiagonals] = useState(false);
  const [animationPromise, setAnimationPromise] =
    useState<Promise<unknown | PayloadAction<any, any>>>(null);
  const grid = useSelector((state: RootState) => state.gridStore.grid);
  const start = useSelector((state: RootState) => state.gridStore.startCoord);
  const meta = useSelector((state: RootState) => state.gridStore.metaCoord);

  const clickHandler = useCallback(
    (algorithm: AlgorithmsSignature) => () => {
      dispatch(cleanGrid());
      const { visitedNodes, pathNodes } = algorithm({
        start,
        grid: structuredClone(grid),
        allowDiagonals: diagonals,
        meta,
      });
      console.log('Path length', pathNodes.length);

      dispatch(setDirty());
      const promise = dispatch(animateResult({ visitedNodes, pathNodes }));

      setAnimationPromise(promise);

      // colorNodes(visitedNodes, NodeType.VISITED, dispatch)
      //   .then(async () => await colorNodes(pathNodes, NodeType.PATH, dispatch))
      //   .catch(console.error);
    },
    [diagonals, dispatch, grid, meta, start]
  );

  const cancelAnimation = () => {
    animationPromise.abort();
  };

  return (
    <>
      <Button onClick={clickHandler(aStar)}>A*</Button>
      <Button onClick={clickHandler(dijkstra)}>Dijkstra</Button>
      <Button onClick={clickHandler(greedyBestFirstSearch)}>
        Greedy best-first search
      </Button>
      <Button onClick={clickHandler(breadthFirstSearch)}>
        Breadth first search
      </Button>
      <Button onClick={clickHandler(depthFirstSearch)}>
        Depth first search
      </Button>
      <div>
        Set diagonals
        <Checkbox checked={diagonals} onChange={setDiagonals} />
      </div>
      <Button onClick={cancelAnimation}>CancelAnimation</Button>
    </>
  );
}
