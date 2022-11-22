import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GridNode, NodeType, RowCol } from 'types';
import { createGrid, resizeGrid } from 'utils/grid';
import { WindowDimensions } from 'hooks';

export interface GridSliceState {
  gridSize: WindowDimensions;
  grid: GridNode[][];
  start: RowCol;
  meta: RowCol;
  addType: number;
}

const initialState: GridSliceState = {
  gridSize: { width: -1, height: -1 },
  grid: [],
  start: { row: 0, col: 0 },
  meta: { row: 0, col: 0 },

  addType: NodeType.EMPTY,
};

export const gridSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setGridSize: (state, action: PayloadAction<WindowDimensions>) => {
      if (
        state.gridSize.height === action.payload.height &&
        state.gridSize.width === action.payload.width
      ) {
        return;
      }

      state.gridSize = action.payload;
      let newGrid;
      if (state.grid.length === 0) {
        newGrid = createGrid(action.payload);
      } else {
        newGrid = resizeGrid(
          action.payload,
          state.grid,
          state.start,
          state.meta
        );
      }

      state.grid = newGrid.grid;
      state.start = newGrid.start;
      state.meta = newGrid.meta;
    },

    setNode: (
      state,
      action: PayloadAction<{
        row: number;
        col: number;
        node: Partial<GridNode>;
      }>
    ) => {
      const { row, col, node } = action.payload;
      state.grid[row][col] = { ...state.grid[row][col], ...node };
    },
    setAddType: (state, action: PayloadAction<RowCol>) => {
      const { row, col } = action.payload;
      console.log(action.payload);
      console.log(state.grid);
      state.addType = state.grid[row][col].type;
    },
    changeType: (state, action: PayloadAction<RowCol>) => {
      const { row, col } = action.payload;

      const node = state.grid[row][col];
      if (node.type === NodeType.START || node.type === NodeType.META) {
        return;
      }

      switch (state.addType) {
        case NodeType.START:
          if (node.type !== NodeType.EMPTY) return;
          node.type = NodeType.START;

          state.grid[state.start.row][state.start.col].type = NodeType.EMPTY;
          state.start.row = row;
          state.start.col = col;
          break;

        case NodeType.META:
          if (node.type !== NodeType.EMPTY) return;
          node.type = NodeType.META;

          state.grid[state.meta.row][state.meta.col].type = NodeType.EMPTY;
          state.meta.row = row;
          state.meta.col = col;
          break;
        case NodeType.EMPTY:
          node.type = NodeType.WALL;
          break;
        case NodeType.WALL:
          node.type = NodeType.EMPTY;
          break;

        default:
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGridSize, setNode, setAddType, changeType } =
  gridSlice.actions;

export const gridLengthEquality = (
  newGrid: GridNode[][],
  oldGrid: GridNode[][]
) => {
  return (
    newGrid.length === oldGrid.length && newGrid[0].length === oldGrid[0].length
  );
};

export default gridSlice.reducer;
