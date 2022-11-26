import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { cleanGrid, setNode } from 'store/gridSlice';
import breadthFirstSearch from 'algorithms/breadthFirstSearch';
import Button from 'atoms/Button';
import { GridNode, NodeType } from 'types';
import { Dispatch } from '@reduxjs/toolkit';

const colorNodes = async (
  visitedNodes: GridNode[],
  type: NodeType,
  dispatch: Dispatch
) =>
  await new Promise<void>((resolve) => {
    let i = 0;
    const animate = () => {
      const node = visitedNodes[i];
      dispatch(
        setNode({
          row: node.row,
          col: node.col,
          node: { type },
        })
      );

      i++;
      if (i !== visitedNodes.length) {
        window.requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };
    animate();
  });

export default function AlgorithmsSelector() {
  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.gridStore.grid);
  const start = useSelector((state: RootState) => state.gridStore.start);

  const callback = () => {
    dispatch(cleanGrid());
    const { visitedNodes, pathNodes } = breadthFirstSearch(
      start,
      structuredClone(grid)
    );

    colorNodes(visitedNodes, NodeType.VISITED, dispatch)
      .then(async () => await colorNodes(pathNodes, NodeType.PATH, dispatch))
      .catch(console.error);
  };

  return <Button onClick={callback}>Algorithm</Button>;
}
