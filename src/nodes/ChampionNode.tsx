import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { SportsBallPhase } from "../SportsBallTypes";


export function ChampionNode({
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
          <p>{data.team?.name ?? 'N/A'}</p>
          <img
            className={'pt-3'}
            style={{width: '100px'}}
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcontent.sportslogos.net%2Fnews%2F2022%2F06%2Fcolorado-avalanche-2022-stanley-cup-champions-logo-on-transparent-sportslogosnet-750x677.png&f=1&nofb=1&ipt=198a23cfb1760dc42022a506b4cbac9b24b60f472bba279a3c3567ac543b2cf1&ipo=images"
          />
        </div>
      )}

      <Handle type="target" position={Position.Top}/>
    </div>
  );
}