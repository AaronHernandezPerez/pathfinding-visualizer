/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';

import {
  GridSliceState,
  GridStatus,
  setGridStatus,
  setMultipleNodesType,
  setNode,
} from 'store/gridSlice';
import { GridNode, NodeType } from 'types';

export const animateResult = createAsyncThunk<
  void,
  { visitedNodes: GridNode[]; pathNodes: GridNode[] }
>(
  'grid/animateResult',
  async ({ visitedNodes, pathNodes }, { signal, dispatch }) => {
    dispatch(setGridStatus(GridStatus.ANIMATING));
    const setAllNodes = () => {
      dispatch(
        setMultipleNodesType({ nodes: visitedNodes, type: NodeType.VISITED })
      );
      dispatch(setMultipleNodesType({ nodes: pathNodes, type: NodeType.PATH }));
      dispatch(setGridStatus(GridStatus.PAINTED));
    };

    await new Promise<void>((resolve) => {
      let p = 0;
      const animatePath = () => {
        const node = pathNodes[p];
        dispatch(
          setNode({
            row: node.row,
            col: node.col,
            node: { type: NodeType.PATH },
          })
        );
        p++;
        if (signal.aborted) {
          return setAllNodes();
        }
        if (p !== pathNodes.length) {
          window.requestAnimationFrame(animatePath);
        } else {
          resolve();
        }
      };
      let v = 0;
      const animateVisited = () => {
        const node = visitedNodes[v];
        dispatch(
          setNode({
            row: node.row,
            col: node.col,
            node: { type: NodeType.VISITED },
          })
        );
        v++;
        if (signal.aborted) {
          return setAllNodes();
        }
        if (v !== visitedNodes.length) {
          window.requestAnimationFrame(animateVisited);
        } else {
          animatePath();
        }
      };
      animateVisited();
    });
    dispatch(setGridStatus(GridStatus.PAINTED));
  }
);

const extraReducers = (builder: ActionReducerMapBuilder<GridSliceState>) => {
  builder
    .addCase(animateResult.pending, (state) => {
      if (state.status === GridStatus.IDLE) {
        state.status = GridStatus.ANIMATING;
      }
    })
    .addCase(animateResult.fulfilled, (state) => {
      state.status = GridStatus.IDLE;
    })
    .addCase(animateResult.rejected, (state) => {
      state.status = GridStatus.IDLE;
    });
};

export default extraReducers;
