import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import Grid from 'components/Grid';
import Header from 'components/Header';
import { useWindowDimensions } from 'hooks';
import { getGridSize } from 'utils/grid';
import { setGridSize } from 'store/gridSlice';
import Button from 'atoms/Button';

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
      <Button>asdsfa</Button>
      <Grid cellSize={CELL_SIZE} />
    </>
  );
}

export default App;
