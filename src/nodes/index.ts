import type { Node, NodeTypes } from "reactflow";
import { SportsBallPhaseNode } from "./SportsBallPhaseNode";
import { SportsBallPhase } from "../SportsBallTypes";
import { becomeNHLTeam, championshipStatus, learnHockey, qualifyForPlayoffs, takeHomeStanleyCup } from "../Objects";
import { ChampionNode } from "./ChampionNode";

export const phaseNodes = [
  { 
    id: "1", 
    type: "sports-ball-phase", 
    position: {x: -450, y: -200},
    data: learnHockey },
  {
    id: "2",
    type: "sports-ball-phase", 
    position: { x: -300, y: -50 },
    data: becomeNHLTeam,
  },
  { 
    id: "3", 
    type: "sports-ball-phase", 
    position: { x: -450, y: 100 }, 
    data: qualifyForPlayoffs 
  },
  { 
    id: "4", 
    type: "sports-ball-phase", 
    position: { x: -300, y: 250 }, 
    data: takeHomeStanleyCup 
  },
  { 
    id: "5", 
    type: "champions-phase", 
    position: { x: -375, y: 400 }, 
    data: championshipStatus 
  }
] satisfies Node<SportsBallPhase>[];

export const nodeTypes = {
  "sports-ball-phase": SportsBallPhaseNode,
  'champions-phase': ChampionNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;
