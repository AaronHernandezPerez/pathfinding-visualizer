import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from 'components/Grid';
import Header from 'components/Header';
import { useWindowDimensions } from 'hooks';
import { createGrid, getSizes, resizeGrid } from 'utils/grid';
import { RootState } from 'store/store';
import { setGrid } from 'store/gridSlice';

export const CELL_SIZE = 24;

function App() {
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.gridStore.grid);

  useEffect(() => {
    let newGrid;
    if (grid.length > 0) {
      newGrid = resizeGrid(getSizes(dimensions, CELL_SIZE), grid);
    } else {
      newGrid = createGrid(getSizes(dimensions, CELL_SIZE));
    }
    dispatch(setGrid(newGrid));
  }, [dimensions]);

  return (
    <>
      <Header />
      <Grid grid={grid} cellSize={CELL_SIZE} />
    </>
  );
}

export default App;
