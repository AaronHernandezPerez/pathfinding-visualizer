import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AlgorithmsSignature } from 'algorithms/types';
import { breadthFirstSearch, depthFirstSearch } from 'algorithms/unweighted';
import { aStar, dijkstra, greedyBestFirstSearch } from 'algorithms/weighted';
import Button from 'components/atoms/Buttons/Button';
import Checkbox from 'components/atoms/Checkbox';
import Select from 'components/atoms/Select';
import { SelectOptions } from 'components/atoms/Select/types';
import { animateResult, cleanGrid, GridStatus } from 'store/gridSlice';
import { AppDispatch, RootState } from 'store/store';

export default function AlgorithmsSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const [diagonals, setDiagonals] = useState(false);
  const [animationPromise, setAnimationPromise] = useState<
    Promise<unknown> & {
      abort: (reason?: string) => void;
    }
  >(null);

  const status = useSelector((state: RootState) => state.gridStore.status);
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

      const promise = dispatch(animateResult({ visitedNodes, pathNodes }));

      setAnimationPromise(promise);
    },
    [diagonals, dispatch, grid, meta, start]
  );

  const cancelAnimation = () => {
    animationPromise.abort();
  };

  const isAnimating = status === GridStatus.ANIMATING;

  const options: SelectOptions[] = useMemo(
    () => [
      { label: 'test' },
      { type: 'separator', label: 'separator' },
      { label: 'asdasd' },
    ],
    []
  );

  return (
    <>
      <Button disabled={isAnimating} onClick={clickHandler(aStar)}>
        A*
      </Button>
      <Button disabled={isAnimating} onClick={clickHandler(dijkstra)}>
        Dijkstra
      </Button>
      <Button
        disabled={isAnimating}
        onClick={clickHandler(greedyBestFirstSearch)}
      >
        Greedy best-first search
      </Button>
      <Button disabled={isAnimating} onClick={clickHandler(breadthFirstSearch)}>
        Breadth first search
      </Button>
      <Button disabled={isAnimating} onClick={clickHandler(depthFirstSearch)}>
        Depth first search
      </Button>
      <div>
        Set diagonals
        <Checkbox checked={diagonals} onChange={setDiagonals} />
      </div>
      <Select options={options} value={options[0]} disabled={isAnimating} />
      <Button
        disabled={status === GridStatus.IDLE || status === GridStatus.PAINTED}
        onClick={cancelAnimation}
      >
        CancelAnimation
      </Button>
    </>
  );
}
