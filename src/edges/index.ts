import type { Edge, EdgeTypes } from "reactflow";

export const initialEdges = [
  { id: "1->2", source: "1", target: "2"},
  { id: "2->3", source: "2", target: "3" },
  { id: "3->4", source: "3", target: "4",},
  { id: "4->5", source: "4", target: "5",},
] satisfies Edge[];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
