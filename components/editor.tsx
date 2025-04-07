import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  Editor as EditorInstance
} from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useAtomValue } from 'jotai/react'
import { editorAtom } from '@/store'

export type {
  EditorInstance
}

export const Editor = function Editor () {
  const editor = useAtomValue(editorAtom)
  return (
    <ProseKit editor={editor}>
      <div className="relative w-full flex-1 box-border overflow-y-scroll">
        <div ref={editor.mount}
             className='ProseMirror box-border min-h-full px-4 py-8 outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500'/>
      </div>
    </ProseKit>
  )
}