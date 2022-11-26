import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import Grid from 'components/Grid';
import Header from 'components/Header';
import { useWindowDimensions } from 'hooks';
import { getGridSize } from 'utils/grid';
import { setGridSize } from 'store/gridSlice';
import AlgorithmsSelector from 'components/AlgorithmsSelector';

export const CELL_SIZE = 24;

function App() {
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();

  const gridSize = useMemo(
    () => getGridSize(dimensions, CELL_SIZE),
    [dimensions]
  );

  useEffect(() => {
    dispatch(setGridSize(gridSize));
  }, [dispatch, gridSize]);

  return (
    <>
      <Header />
      <AlgorithmsSelector />
      <Grid cellSize={CELL_SIZE} />
    </>
  );
}

export default App;
