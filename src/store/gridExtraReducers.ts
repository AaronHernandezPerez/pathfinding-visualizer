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

const ANIMATION_TIME = 500;

export const animateResult = createAsyncThunk<
  void,
  { visitedNodes: GridNode[]; pathNodes: GridNode[] }
>(
  'grid/animateResult',
  async ({ visitedNodes, pathNodes }, { signal, dispatch }) => {
    await new Promise<void>((resolve) => {
      if (visitedNodes.length === 0) {
        resolve();
      }

      const timeoutResolve = () =>
        setTimeout(() => {
          resolve();
        }, ANIMATION_TIME);

      const setAllNodes = () => {
        dispatch(
          setMultipleNodesType({ nodes: visitedNodes, type: NodeType.VISITED })
        );
        dispatch(
          setMultipleNodesType({ nodes: pathNodes, type: NodeType.PATH })
        );
        timeoutResolve();
      };

      let p = 0;
      const animatePath = () => {
        if (pathNodes.length === 0) {
          return timeoutResolve();
        }
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
          setAllNodes();
        } else if (p !== pathNodes.length) {
          window.requestAnimationFrame(animatePath);
        } else {
          timeoutResolve();
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
          setAllNodes();
        } else if (v !== visitedNodes.length) {
          window.requestAnimationFrame(animateVisited);
        } else {
          animatePath();
        }
      };

      animateVisited();
    });
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
      state.status = GridStatus.PAINTED;
    })
    .addCase(animateResult.rejected, (state) => {
      state.status = GridStatus.PAINTED;
    });
};

export default extraReducers;
