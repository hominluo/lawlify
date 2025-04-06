'use client'

import React, { useRef, useTransition } from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CaseSelector } from '@/components/case-selector'
import { ChatInterface } from '@/components/chat-interface'
import { Editor, EditorInstance } from '@/components/editor'
import { htmlFromMarkdown, markdownFromHTML } from '@/lib/markdown'
import { cn } from '@/lib/utils'
import { useSetAtom } from 'jotai/react'
import { predictionAtom } from '@/store'
import { useRouter } from 'next/navigation'

export default function StartPage () {
  const [step, setStep] = useState(1)
  const totalSteps = 2

  const [formData, setFormData] = useState({
    caseCategory: '',
    caseDetails: ''
  })


  const [isPending, startTransition] = useTransition()

  const progress = (step / totalSteps) * 100

  const handleCaseCategoryChange = (category: string) => {
    setFormData((prev) => ({ ...prev, caseCategory: category }))
    // Automatically move to step 2 when category is selected
    setStep(2)
  }

  const editorRef = useRef<EditorInstance | null>(null)

  const setPrediction = useSetAtom(predictionAtom)
  const router = useRouter()

  return (
    <div className="container mx-auto space-y-4">
      <div>
        <Link href="/"
              className="flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4"/>
          Back to Home
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">Find Legal Help</h1>
        <div className="flex items-center gap-4">
          <Progress value={progress} className="h-2 flex-1"/>
          <span className="text-sm text-gray-500">
            Step {step} of {totalSteps}
          </span>
        </div>
      </div>

      <div
        className="flex flex-row gap-4"
      >
        <Card className={cn(step === 1 ? 'mx-auto' : 'flex-1')}>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Select Case Category</CardTitle>
                <CardDescription>Choose the category that best describes your
                  legal situation.</CardDescription>
              </CardHeader>
              <CardContent>
                <CaseSelector selectedCategory={formData.caseCategory}
                              onSelectCategory={handleCaseCategoryChange}/>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Case Details</CardTitle>
                <CardDescription>
                  Our legal assistant will help you provide the necessary
                  details
                  about your case.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChatInterface
                  caseCategory={formData.caseCategory}
                  onSetDescriptionAction={(text) => {
                    editorRef.current!.setContent(
                      htmlFromMarkdown(text)
                    )
                  }}
                />
              </CardContent>
            </>
          )}
        </Card>

        {step === 2 && (
          <Card className="w-96">
            <CardContent className="flex flex-col h-full">
              <Editor
                ref={editorRef}
              />
              <div
                className="w-full flex gap-4"
              >
                <div className="flex-1"/>
                <Button
                  disabled={isPending}
                  className={cn(isPending && 'cursor-not-allowed')}
                  onClick={() => {
                    startTransition(async () => {
                      const response = await fetch('/api/search', {
                        method: 'POST',
                        body: JSON.stringify({
                          query: markdownFromHTML(editorRef.current!.getDocHTML())
                        })
                      })
                      setPrediction(await response.json())
                      router.push('/prediction')
                    })
                  }}
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  ): <ArrowRight className="mr-2 h-4 w-4"/>}
                  {isPending ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

