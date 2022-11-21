import { NodeType } from 'types';
import { NodeProps } from './types';

const typeStyles = {
  [NodeType.START]: 'bg-grid-start',
  [NodeType.META]: 'bg-grid-meta',
  [NodeType.EMPTY]: '',
  [NodeType.WALL]: '',
};

export default function Node({ id, size, type }: NodeProps) {
  return (
    <div
      id={id}
      className={
        'border-r border-b border-grid-border select-none ' + typeStyles[type]
      }
      style={{ height: size, width: size }}
    ></div>
  );
}
