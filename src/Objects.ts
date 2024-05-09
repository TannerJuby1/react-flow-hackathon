import { SportsBallPhase, SportsBallTeam } from "./SportsBallTypes"

export const denverNuggets: SportsBallTeam = {
  nodeType: 'SportsBallTeam',
  name: 'Denver Nuggets',
  attributes: [
    {
      name: 'Sport(s)',
      options: ['Football', 'Basketball', 'Hockey', 'Baseball'],
      current: 'Basketball'
    },
    {
      name: 'NHL Establishment',
      options: ['', 'Not Official Hockey Team', 'Minor League Team', 'Usurped the Vancouver Canucks', 'Legitimate NHL Team'],
      current: ''
    },
    {
      name: 'Playoffs Qualification',
      options: ['', 'hell nah, they suck', 'Bribed League Officials', 'Scored 50 Runs', 'Scored 100 Touchdowns'],
      current: ''
    },
    {
      name: 'Championship Status',
      options: ['', 'What\'s a Championship?', 'Lose Miserably', 'Kneecap the Avalanche in the parking lot before game', 'Won Honorably', 'Lose Miserably, and kneecap the Avalance in the parking lot after the game and steal the cup.'],
      current: ''
    }
  ]
}

// Phases
export const learnHockey: SportsBallPhase = {
  nodeType: 'SportsBallPhase',
  label: 'Learn Hockey',
  details: 'The Team needs to first learn how to play Hockey.',
  minConditionsToMeet: 1,
  conditions: [
    {
      label: 'Can Play Hockey',
      achieved: (sportsTeam?: SportsBallTeam) => {
        if (!sportsTeam) return false
        return sportsTeam.attributes[0].current === sportsTeam.attributes[0].options[2]
      }
    }
  ],
  team: denverNuggets
}

export const becomeNHLTeam: SportsBallPhase = {
  nodeType: 'SportsBallPhase',
  label: 'Become NHL Team',
  details: 'The team will need to obtain a spot in the NHL',
  minConditionsToMeet: 1,
  conditions: [
    {
      label: 'Official NHL Team',
      achieved: (sportsTeam?: SportsBallTeam) => {
        if (!sportsTeam) return false
        return sportsTeam.attributes[1].current === sportsTeam.attributes[1].options[4]
      }
    },
    {
      label: 'Impersonating NHL Team',
      achieved: (sportsTeam?: SportsBallTeam) => {
        if (!sportsTeam) return false
        return sportsTeam.attributes[1].current === sportsTeam.attributes[1].options[3]
      }
    }
  ],
}

export const qualifyForPlayoffs: SportsBallPhase = {
  nodeType: 'SportsBallPhase',
  label: 'Qualify for NHL Playoffs',
  details: 'The team will need to qualify for the playoffs (method need not matter).',
  minConditionsToMeet: 1,
  conditions: [
    {
      label: 'Score enough points during the season',
      achieved: (sportsTeam?: SportsBallTeam) => {
        if (!sportsTeam) return false
        return sportsTeam.attributes[2].current === sportsTeam.attributes[2].options[4]
      }
    },
    {
      label: 'Bribe or Intimidate Officials',
      achieved: (sportsTeam?: SportsBallTeam) => {
        if (!sportsTeam) return false
        return sportsTeam.attributes[2].current ===  sportsTeam.attributes[2].options[2]
      }
    }
  ],
}

export const takeHomeStanleyCup: SportsBallPhase = {
  nodeType: 'SportsBallPhase',
  label: 'Drink from the Stanley Cup',
  details: 'Take home the Sacred Stanley Cup and Drink from Beer from it. Truly, the ends justify the means.',
  minConditionsToMeet: 1,
  conditions: [
    {
      label: 'Beat the other Team',
      achieved: (sportsTeam?: SportsBallTeam) => {
        if (!sportsTeam) return false
        return sportsTeam.attributes[3].current === sportsTeam.attributes[3].options[3] || sportsTeam.attributes[3].current === sportsTeam.attributes[3].options[4]
      }
    },
    {
      label: 'Steal the cup from the real Champions',
      achieved: (sportsTeam?: SportsBallTeam) => {
        if (!sportsTeam) return false
        return sportsTeam.attributes[3].current === sportsTeam.attributes[3].options[5]
      }
    }
  ],
}

export const championshipStatus: SportsBallPhase = {
  nodeType: 'SportsBallPhase',
  label: 'NHL Stanley CHAMPIONS',
  details: 'CONGRATULATIONS CHAMPIONS, you have obtained the Sacred Stanley Cup',
}