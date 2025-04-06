import { atom } from 'jotai'

export const predictionAtom = atom<{
  case_name: string
  relevance_justification: string
  relevance_score: number,
  case_outcome: {
    won: boolean,
    explanation: string
  },
}[]>([])