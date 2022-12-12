import { MouseEvent } from 'react';

export interface NodeProps {
  size: number;
  row: number;
  col: number;
  handleMouseDown: (e: MouseEvent) => void;
  handleMouseEnter: (e: MouseEvent) => void;
}
