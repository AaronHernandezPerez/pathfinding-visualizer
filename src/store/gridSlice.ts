import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import extraReducers from 'store/gridExtraReducers';
import { GridNode, GridOfNodes, NodeType, RowCol } from 'types';
import { createGrid, resizeGrid } from 'utils/grid';

export enum GridStatus {
  IDLE = 'idle',
  ANIMATING = 'animating',
  PAINTED = 'painted',
}

export interface GridSliceState {
  status: GridStatus;
  gridSize: {
    width: number;
    height: number;
  };
  grid: GridOfNodes;
  startCoord: RowCol;
  metaCoord: RowCol;
  addType: NodeType;
  allowDiagonals: boolean;
}

const initialState: GridSliceState = {
  status: GridStatus.IDLE,
  gridSize: { width: -1, height: -1 },
  grid: [],
  startCoord: { row: 0, col: 0 },
  metaCoord: { row: 0, col: 0 },
  addType: NodeType.EMPTY,
  allowDiagonals: false,
};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setGridSize: (state, action: PayloadAction<GridSliceState['gridSize']>) => {
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
          state.startCoord,
          state.metaCoord
        );
      }

      state.grid = newGrid.grid;
      state.startCoord = newGrid.start;
      state.metaCoord = newGrid.meta;
    },
    setGridStatus: (state, action: PayloadAction<GridStatus>) => {
      state.status = action.payload;
    },
    updateGrid: (
      state,
      action: PayloadAction<{
        grid: GridOfNodes;
      }>
    ) => {
      state.grid = action.payload.grid;
    },

    cleanGrid: (state) => {
      if (state.status === GridStatus.ANIMATING) return;

      const typesToEmpty = [NodeType.PATH, NodeType.VISITED];
      state.grid.forEach((row) => {
        row.forEach((node) => {
          if (typesToEmpty.includes(node.type)) {
            node.type = NodeType.EMPTY;
          }
        });
      });
      state.status = GridStatus.IDLE;
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
      if (state.status === GridStatus.ANIMATING) return;

      const { row, col } = action.payload;
      state.addType = state.grid[row][col].type;
    },
    setMultipleNodesType: (
      state,
      action: PayloadAction<{ nodes: GridNode[]; type: NodeType }>
    ) => {
      const { nodes, type } = action.payload;
      nodes.forEach(({ row, col }) => {
        state.grid[row][col].type = type;
      });
    },

    setNodeType: (
      state,
      action: PayloadAction<RowCol & { forceType?: NodeType }>
    ) => {
      if (state.status === GridStatus.ANIMATING) return;

      const { row, col, forceType } = action.payload;

      const node = state.grid[row][col];
      if (node.type === NodeType.START || node.type === NodeType.META) {
        return;
      }

      if (forceType) {
        node.type = forceType;
        return;
      }

      const addTypeString =
        state.addType === NodeType.START ? 'startCoord' : 'metaCoord';

      switch (state.addType) {
        case NodeType.START:
        case NodeType.META:
          if (![NodeType.EMPTY, NodeType.VISITED].includes(node.type)) break;
          node.type = state.addType;

          state.grid[state[addTypeString].row][state[addTypeString].col].type =
            NodeType.EMPTY;
          state[addTypeString].row = row;
          state[addTypeString].col = col;
          break;

        default:
          node.type = NodeType.WALL;
          break;
      }
    },
    setAllowDiagonals: (state, action: PayloadAction<boolean>) => {
      state.allowDiagonals = action.payload;
    },
    toggleAllowDiagonals: (state) => {
      state.allowDiagonals = !state.allowDiagonals;
    },
  },
  extraReducers,
});

// Action creators are generated for each case reducer function
export const {
  setGridSize,
  cleanGrid,
  setGridStatus,
  setNode,
  setMultipleNodesType,
  setAddType,
  setNodeType,
  updateGrid,
  setAllowDiagonals,
  toggleAllowDiagonals,
} = gridSlice.actions;

// Extra actions from the extra reducer
export { animateResult } from 'store/gridExtraReducers';

export const gridLengthEquality = (
  newGrid: GridOfNodes,
  oldGrid: GridOfNodes
) => {
  return (
    newGrid.length === oldGrid.length && newGrid[0].length === oldGrid[0].length
  );
};

export default gridSlice.reducer;
