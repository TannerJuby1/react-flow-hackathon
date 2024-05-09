import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { SportsBallPhase } from "../SportsBallTypes";


export function SportsBallPhaseNode({
  data
}: NodeProps<SportsBallPhase>) {
  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && <h6>{data.label}</h6>}

      {data.team && (
        <p>{data.team?.name ?? 'N/A'}</p>
      )}

      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
}