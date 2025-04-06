import { compile } from '@mdx-js/mdx'
import { useMDXComponents } from '@mdx-js/react'
import { useState, useEffect } from 'react'
import * as runtime from 'react/jsx-runtime'

const components = {
  pre: (props: any) => (
    <pre
      className="overflow-x-auto whitespace-pre-wrap break-words"
      {...props}
    />
  ),
  h1: (props: any) => <h1 className="text-2xl font-bold mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-xl font-bold mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-lg font-bold mb-4" {...props} />,
  h4: (props: any) => <h4 className="text-base font-bold mb-4" {...props} />,
  h5: (props: any) => <h5 className="text-sm font-bold mb-4" {...props} />,
  h6: (props: any) => <h6 className="text-xs font-bold mb-4" {...props} />,
  a: (props: any) => (
    <a
      className="text-blue-500 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props: any) => <ul className="list-disc pl-5 mb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 mb-4" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l border-purple-500 pl-3 text-sm text-gray-400"
      {...props}
    />
  ),
  img: (props: any) => <img className="w-full" {...props} />
}

const toMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

export function MarkdownContent ({ content }: { content: string }) {
  const mdxComponents = useMDXComponents()

  const [Component, setComponent] = useState<any>(
    () => function C () {return <>{content}</>})

  useEffect(() => {
    (async () => {
      try {
        const escapedContent = content.replace(/\{/g, '\\{').
          replace(/\}/g, '\\}').
          replace(/</g, '&lt;').
          replace(/>/g, '&gt;')
        const code = await compile(escapedContent, {
          outputFormat: 'function-body',
          development: false
        })
        const MDXComponent = toMDXComponent(code.value.toString())
        setComponent(() => MDXComponent)
      } catch (e) {
        console.error('Error rendering markdown:', e)
      }
    })()
  }, [content])

  return <Component components={{ ...mdxComponents, ...components }}/>
}

