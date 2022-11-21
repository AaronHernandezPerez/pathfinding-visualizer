import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GridNode } from 'types';

export interface GridSliceState {
  grid: GridNode[][];
}

const initialState: GridSliceState = {
  grid: [],
};

export const gridSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setGrid: (state, action: PayloadAction<GridNode[][]>) => {
      state.grid = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGrid } = gridSlice.actions;

export default gridSlice.reducer;
