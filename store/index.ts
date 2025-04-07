import { atom } from 'jotai'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'

export const predictionAtom = atom<{
  case_name: string
  relevance_justification: string
  relevance_score: number,
  case_outcome: {
    won: boolean,
    explanation: string
  },
}[]>([])

export const editorAtom = atom(() => {
  const extension = defineBasicExtension()
  return createEditor({ extension })
})