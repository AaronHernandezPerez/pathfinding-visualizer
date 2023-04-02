import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/atoms/Buttons/Button';
import useGetWindowDimensions from 'hooks/useGetWindowDimensions';
import { setGridSize } from 'store/gridSlice';
import { getGridSize } from 'utils/grid';
import { ResizeGridProps } from './types';

function ResizeGrid({ cellSize = 24 }: ResizeGridProps) {
  const dispatch = useDispatch();

  const dimensions = useGetWindowDimensions();
  const resize = () => dispatch(setGridSize(getGridSize(dimensions, cellSize)));

  return <Button variant='secondary' onClick={resize}>Resize</Button>;
}

export default ResizeGrid;
