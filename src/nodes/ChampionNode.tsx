import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { SportsBallPhase } from "../SportsBallTypes";


export function ChampionNode({
  data
}: NodeProps<SportsBallPhase>) {
  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && <h6>{data.label}</h6>}

      {data.team && (
        <p>{data.team?.name ?? 'N/A'}</p>
      )}
      
      <img style={{ width: '100px'}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcontent.sportslogos.net%2Fnews%2F2022%2F06%2Fcolorado-avalanche-2022-stanley-cup-champions-logo-on-transparent-sportslogosnet-750x677.png&f=1&nofb=1&ipt=198a23cfb1760dc42022a506b4cbac9b24b60f472bba279a3c3567ac543b2cf1&ipo=images" />

      <Handle type="target" position={Position.Top} />
    </div>
  );
}