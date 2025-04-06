"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { CaseSelector } from "@/components/case-selector"
import { ChatInterface } from "@/components/chat-interface"

export default function StartPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 2

  const [formData, setFormData] = useState({
    caseCategory: "",
    caseDetails: "",
    additionalInfo: "",
  })

  const progress = (step / totalSteps) * 100

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCaseCategoryChange = (category: string) => {
    setFormData((prev) => ({ ...prev, caseCategory: category }))
    // Automatically move to step 2 when category is selected
    setStep(2)
  }

  const handleCaseDetailsUpdate = (details: string) => {
    setFormData((prev) => ({ ...prev, caseDetails: details }))
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      router.push(`/prediction?category=${formData.caseCategory}`)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push("/")
    }
  }

  const isStepValid = () => {
    if (step === 1) {
      return formData.caseCategory
    } else if (step === 2) {
      return formData.caseDetails
    }
    return false
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Find Legal Help</h1>
        <div className="flex items-center gap-4">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-sm text-gray-500">
            Step {step} of {totalSteps}
          </span>
        </div>
      </div>

      <Card className="mb-8">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Select Case Category</CardTitle>
              <CardDescription>Choose the category that best describes your legal situation.</CardDescription>
            </CardHeader>
            <CardContent>
              <CaseSelector selectedCategory={formData.caseCategory} onSelectCategory={handleCaseCategoryChange} />
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Case Details</CardTitle>
              <CardDescription>
                Our legal assistant will help you provide the necessary details about your case.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formData.caseCategory ? (
                <ChatInterface caseCategory={formData.caseCategory} onCaseDetailsUpdate={handleCaseDetailsUpdate} />
              ) : (
                <div className="p-4 text-center text-gray-500">Please select a case category first</div>
              )}

              <div className="space-y-2 mt-6">
                <Label htmlFor="additionalInfo">Additional Information (optional)</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any other details that might be relevant..."
                />
              </div>
            </CardContent>
          </>
        )}

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!isStepValid()}>
            {step === totalSteps ? "View Prediction" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Case Summary</CardTitle>
            <CardDescription>Review your information before submitting.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Case Category</p>
                <p>{formData.caseCategory.replace("-", " ")}</p>
              </div>
              {formData.caseDetails && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Case Details</p>
                  <p className="text-sm whitespace-pre-line">{formData.caseDetails}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

