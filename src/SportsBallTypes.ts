export type Sport = 'Football' | 'Basketball' | 'Hockey' | 'Baseball'

export type SportsBallTeam = {
  nodeType: 'SportsBallTeam',
  name: string,
  attributes: {
    name: string,
    options: string[],
    current: string
  }[]
}


export type SportsBallConditional = SportsBallTeam

export interface SportsBallPhaseCondition {
  label: string
  achieved: (obj?: SportsBallTeam) => boolean
}

export interface SportsBallPhase {
  nodeType: 'SportsBallPhase',
  label: string
  details: string
  conditions?: SportsBallPhaseCondition[]
  minConditionsToMeet?: number
  team?: SportsBallTeam
}