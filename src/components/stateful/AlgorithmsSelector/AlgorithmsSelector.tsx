import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AlgorithmsSignature } from 'algorithms/types';
import { breadthFirstSearch, depthFirstSearch } from 'algorithms/unweighted';
import { aStar, dijkstra, greedyBestFirstSearch } from 'algorithms/weighted';
import Button from 'components/atoms/Buttons/Button';
import Select from 'components/atoms/Select';
import { SelectOptions } from 'components/atoms/Select/types';
import { animateResult, cleanGrid, GridStatus } from 'store/gridSlice';
import { AppDispatch, RootState } from 'store/store';

const options: Array<SelectOptions<AlgorithmsSignature>> = [
  { label: 'Weighted', disabled: true },
  { label: 'A*', value: aStar },
  { label: 'Dijkstra', value: dijkstra },
  { label: 'Greedy best-first search', value: greedyBestFirstSearch },
  { type: 'separator', label: 'unweighted separator' },
  { label: 'Unweighted', disabled: true },
  { label: 'Breadth first search', value: breadthFirstSearch },
  { label: 'Depth first search', value: depthFirstSearch },
];

function AlgorithmsSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.gridStore.status);
  const [selectedOption, setSelectedOption] = useState<
    SelectOptions<AlgorithmsSignature>
  >(options[1]);
  const [animationPromise, setAnimationPromise] = useState<
    Promise<unknown> & {
      abort: (reason?: string) => void;
    }
  >(null);

  const runAlgorithm = () => {
    dispatch(cleanGrid());
    const promise = dispatch(
      animateResult({ algorithm: selectedOption.value })
    );
    setAnimationPromise(promise);
  };

  const onChange = useCallback((t: SelectOptions<AlgorithmsSignature>) => {
    setSelectedOption(t);
  }, []);

  const cancelAnimation = () => {
    animationPromise.abort();
  };

  const isAnimating = status === GridStatus.ANIMATING;

  return (
    <>
      <div className="min-w-full md:w-32 md:min-w-0 lg:w-56">
        <Select
          options={options}
          value={selectedOption}
          disabled={isAnimating}
          onChange={onChange}
        />
      </div>

      <Button disabled={isAnimating} onClick={runAlgorithm}>
        Visualize
      </Button>

      <Button
        disabled={status === GridStatus.IDLE || status === GridStatus.PAINTED}
        onClick={cancelAnimation}
      >
        CancelAnimation
      </Button>
    </>
  );
}

export default AlgorithmsSelector;
