import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  Editor as EditorInstance
} from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useImperativeHandle, useMemo } from 'react'
import { defineBasicExtension } from 'prosekit/basic'

export type {
  EditorInstance
}

export type EditorProps = {
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  ref?: React.ForwardedRef<EditorInstance>
}

export const Editor = function Editor (
  { ref }: EditorProps) {
  const editor = useMemo(() => {
    const extension = defineBasicExtension()
    return createEditor({ extension })
  }, [])

  useImperativeHandle(ref, () => editor, [editor])

  return (
    <ProseKit editor={editor}>
      <div className="relative w-full flex-1 box-border overflow-y-scroll">
        <div ref={editor.mount}
             className='ProseMirror box-border min-h-full px-4 py-8 outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500'/>
      </div>
    </ProseKit>
  )
}