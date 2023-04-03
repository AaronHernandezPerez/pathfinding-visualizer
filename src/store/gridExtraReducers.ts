/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';

import { AlgorithmsSignature } from 'algorithms/types';
import {
  GridSliceState,
  GridStatus,
  setMultipleNodesType,
  setNode,
} from 'store/gridSlice';
import { RootState } from 'store/store';
import { NodeType } from 'types';

export const animateResult = createAsyncThunk<
  void,
  { algorithm: AlgorithmsSignature }
>(
  'grid/animateResult',
  async ({ algorithm }, { signal, getState, dispatch }) => {
    const { grid, startCoord, allowDiagonals, metaCoord } = (
      getState() as RootState
    ).gridStore;
    const { visitedNodes, pathNodes } = algorithm({
      start: startCoord,
      meta: metaCoord,
      grid,
      allowDiagonals,
    });
    await new Promise<void>((resolve) => {
      if (visitedNodes.length === 0) {
        resolve();
      }

      const setAllNodes = () => {
        dispatch(
          setMultipleNodesType({ nodes: visitedNodes, type: NodeType.VISITED })
        );
        dispatch(
          setMultipleNodesType({ nodes: pathNodes, type: NodeType.PATH })
        );
        resolve();
      };

      let p = 0;
      const animatePath = () => {
        if (pathNodes.length === 0) {
          return resolve();
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
