import type {OnConnect, ReactFlowInstance} from "reactflow";

import { useCallback, useEffect, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";

import 'bootstrap/dist/css/bootstrap.min.css';
import "reactflow/dist/style.css";

import './App.scss'

import { nodeTypes, phaseNodes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import { SportsBallPhase, SportsBallTeam } from "./SportsBallTypes";
import { Button, FormLabel, FormSelect } from "react-bootstrap";
import ConfettiExplosion from "react-confetti-explosion";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(phaseNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const [activeNode, setActiveNode] = useState<SportsBallPhase | undefined>()

  const [currentTeamPhaseIndex, setCurrentTeamPhaseIndex] = useState(0)
  const [team, setTeam] = useState<SportsBallTeam>() 

  const [explodeConfetti, setExplodeConfetti] = useState(false)

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()

  useEffect(() => {
    // Update Current Team Phase Index and Team
    let tmpCurrrentTeamPhaseIndex = 0
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].data.team) {
        tmpCurrrentTeamPhaseIndex = i
        break
      }
    }
    setCurrentTeamPhaseIndex(tmpCurrrentTeamPhaseIndex)

    // Set Active Node
    let activeNode: SportsBallPhase | undefined = undefined
    nodes.forEach(n => {
      if (n.selected) activeNode = n.data
    })
    setActiveNode(activeNode)
  }, [nodes])

  useEffect(()=> {

    setTimeout(()=> {
      reactFlowInstance?.fitView()
      console.log("ACTIVE NODE: ", activeNode)
    }, 200)
  }, [activeNode])

  useEffect(() => {
    if (!team) {
      setTeam(nodes[currentTeamPhaseIndex].data.team)
    }

    // Celebrate
    console.log(currentTeamPhaseIndex)
    if (currentTeamPhaseIndex === nodes.length - 1) {
      console.log('YAY')
      setExplodeConfetti(true)
    }
  }, [currentTeamPhaseIndex])

  useEffect(() => {
    if (team) {
      const newNodes = [...nodes]
      newNodes[currentTeamPhaseIndex].data.team = team
      setNodes(newNodes)
    }
  }, [team])

  // Form Options
  const handleAttributeChange = (index: number, value: string) => {
    if (team) {
      const newAttributes = [...team?.attributes]
      newAttributes[index].current = value
      setTeam({
        ...team,
        attributes: newAttributes
      })
    }
  }

  const moveToNextPhase = () => {
    const newNodes = [...nodes]

    // Move Team next Phase if there is one
    if (currentTeamPhaseIndex < nodes.length - 1) {
      newNodes[currentTeamPhaseIndex + 1].data.team = newNodes[currentTeamPhaseIndex].data.team
      newNodes[currentTeamPhaseIndex + 1].selected = true
    }

    // Remove Team From Current Phase
    newNodes[currentTeamPhaseIndex].data.team = undefined
    newNodes[currentTeamPhaseIndex].selected = false

    setNodes(newNodes)
  }

  const renderSideBar = () => {
    let conditionsMet = 0
    activeNode?.conditions?.forEach(condition => {
       if (condition.achieved(activeNode.team)) conditionsMet += 1
    })
    const minConditionsToMeet = activeNode?.minConditionsToMeet ?? 0
    const teamReadyForNextPhase = conditionsMet >= minConditionsToMeet

    return (
      <div className="d-flex flex-column justify-content-between gap-4 h-100 p-5 overflow-y-scroll">
        <div className="header">
          <h2>{activeNode?.label}</h2>
          <p>{activeNode?.details}</p>
        </div>
        <hr />
        {activeNode?.team && (
          <div className="team-details">
            <div className={'d-flex flex-column align-items-center gap-2'}>
              <img
                style={{width: '100px'}}
                src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogodownload.org%2Fwp-content%2Fuploads%2F2021%2F07%2Fdenver-nuggets-logo-5.png&f=1&nofb=1&ipt=4c2ec485083022cfca3052ea379e85feafa85e7b280f13778ba4efd34ffc8642&ipo=images'}
              />
              <h4 className="">{activeNode.team.name}</h4>
            </div>

            <div className="d-flex flex-column gap-3">
              {
                team?.attributes.map((attribute, i) => {
                  return (
                    <div>
                      <FormLabel>{attribute.name}</FormLabel>
                      <FormSelect value={attribute.current} disabled={currentTeamPhaseIndex !== i}
                                  onChange={({target: {value}}) => {
                                    handleAttributeChange(i, value)
                                  }}>
                        {attribute.options.map(option =>
                          <option value={option}>{option}</option>
                        )}
                      </FormSelect>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )}
        {currentTeamPhaseIndex !== nodes.length - 1 && (
          <>
            <hr/>
            <div className="conditions">
              <p>Options to Qualify for Next Phase</p>
              <ul>
                {activeNode?.conditions?.map(condition => {
                  const isCompleteString = `[${condition.achieved(activeNode.team)}]`
                  return (
                    <li>{isCompleteString} {condition.label}</li>
                  )
                })}
              </ul>
              <Button onClick={moveToNextPhase} className="w-100 progress-button" disabled={!teamReadyForNextPhase}>
                Promote {activeNode?.team?.name} to next Phase
              </Button>
            </div>
          </>
        )}
      </div>

    )
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        {explodeConfetti && <ConfettiExplosion force={0.8} duration={5000} particleCount={500} width={2400}/>}
      </div>
      <div className={'d-flex flex-column h-100'}>
        <div className={'text-center p-3 sticky-top title'}>
          <h1>Nuggets' Path to Drinking from the Stanley Cup</h1>
        </div>
        <div className="d-flex w-100 h-100 overflow-hidden">
          <ReactFlow
            nodes={[...nodes]}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={(instance) => setReactFlowInstance(instance)}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
          {activeNode && <div className='side-bar'>
            {renderSideBar()}
          </div>}
        </div>
      </div>
    </>
  );
}
