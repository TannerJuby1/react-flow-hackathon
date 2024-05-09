import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { SportsBallPhase } from "../SportsBallTypes";


export function SportsBallPhaseNode({
  data,
  selected
}: NodeProps<SportsBallPhase>) {
  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className={`react-flow__node-default custom-node ${selected ? 'selected' : ''}`}>
      {data.label && <h6>{data.label}</h6>}

      {data.team && (
        <div>
          <img
            style={{width: '50px'}}
            src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogodownload.org%2Fwp-content%2Fuploads%2F2021%2F07%2Fdenver-nuggets-logo-5.png&f=1&nofb=1&ipt=4c2ec485083022cfca3052ea379e85feafa85e7b280f13778ba4efd34ffc8642&ipo=images'}
          />
          <p className={'m-0'}>{data.team?.name ?? 'N/A'}</p>
        </div>
      )}

      <Handle type="source" position={Position.Bottom}/>
      <Handle type="target" position={Position.Top}/>
    </div>
  );
}