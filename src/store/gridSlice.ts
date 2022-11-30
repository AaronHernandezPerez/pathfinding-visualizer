import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GridNode, GridOfNodes, NodeType, RowCol } from 'types';
import { createGrid, resizeGrid } from 'utils/grid';
import { WindowDimensions } from 'hooks';

export interface GridSliceState {
  gridSize: WindowDimensions;
  grid: GridOfNodes;
  startCoord: RowCol;
  metaCoord: RowCol;
  addType: NodeType;
  dirty: boolean;
}

const initialState: GridSliceState = {
  gridSize: { width: -1, height: -1 },
  grid: [],
  startCoord: { row: 0, col: 0 },
  metaCoord: { row: 0, col: 0 },
  addType: NodeType.EMPTY,
  dirty: false,
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
          state.startCoord,
          state.metaCoord
        );
      }

      state.grid = newGrid.grid;
      state.startCoord = newGrid.start;
      state.metaCoord = newGrid.meta;
    },
    updateGrid: (
      state,
      action: PayloadAction<{
        grid: GridOfNodes;
      }>
    ) => {
      console.log('NewGrid', action.payload.grid);

      state.grid = action.payload.grid;
    },
    setDirty: (state) => {
      state.dirty = true;
    },
    cleanGrid: (state) => {
      if (!state.dirty) return;
      const typesToEmpty = [NodeType.PATH, NodeType.VISITED];
      state.grid.forEach((row) => {
        row.forEach((node) => {
          if (typesToEmpty.includes(node.type)) {
            node.type = NodeType.EMPTY;
          }
        });
      });

      state.dirty = false;
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
      state.addType = state.grid[row][col].type;
    },
    setNodeType: (
      state,
      action: PayloadAction<RowCol & { forceType?: NodeType }>
    ) => {
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

        // case NodeType.META:
        //   if (node.type !== NodeType.EMPTY) return;
        //   node.type = NodeType.META;

        //   state.grid[state.meta.row][state.meta.col].type = NodeType.EMPTY;
        //   state.meta.row = row;
        //   state.meta.col = col;
        //   break;
        // case NodeType.PATH:
        //   node.type = NodeType.PATH;
        //   break;
        // case NodeType.WALL:
        //   node.type = NodeType.EMPTY;
        //   break;

        default:
          node.type = NodeType.WALL;
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setGridSize,
  setDirty,
  cleanGrid,
  setNode,
  setAddType,
  setNodeType,
  updateGrid,
} = gridSlice.actions;

export const gridLengthEquality = (
  newGrid: GridOfNodes,
  oldGrid: GridOfNodes
) => {
  return (
    newGrid.length === oldGrid.length && newGrid[0].length === oldGrid[0].length
  );
};

export default gridSlice.reducer;
