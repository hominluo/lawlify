"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  FileText,
  BookOpen,
  Scale,
  Calendar,
  MessageSquare,
  Phone,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Mock data for similar cases
const similarCases = [
  {
    id: 1,
    title: "Johnson v. Smith",
    citation: "123 F.3d 456 (9th Cir. 2021)",
    description: "Personal injury case involving a slip and fall at a grocery store",
    facts:
      "Plaintiff slipped on a wet floor in the produce section. No caution sign was present. Store had knowledge of the spill for approximately 15 minutes before the incident occurred.",
    outcome: "Favorable settlement of $45,000",
    reasoning:
      "The court found that the store had a duty to warn customers of known hazards and failed to do so in a timely manner.",
    similarity: 87,
    highlights: ["slip and fall", "premises liability", "moderate injuries"],
    date: "June 12, 2021",
  },
  {
    id: 2,
    title: "Garcia v. City Hospital",
    citation: "234 F.3d 567 (7th Cir. 2020)",
    description: "Medical malpractice case involving incorrect medication dosage",
    facts:
      "Patient was administered 10x the prescribed dose of medication by hospital staff, resulting in temporary organ damage and extended hospital stay.",
    outcome: "Jury verdict of $120,000 for plaintiff",
    reasoning:
      "The jury determined that the hospital staff failed to follow standard medication protocols and that this deviation from the standard of care directly caused the plaintiff's injuries.",
    similarity: 72,
    highlights: ["medical error", "negligence", "documented injuries"],
    date: "November 3, 2020",
  },
  {
    id: 3,
    title: "Williams v. ABC Corporation",
    citation: "345 F.3d 678 (6th Cir. 2022)",
    description: "Workplace injury case involving machinery malfunction",
    facts:
      "Employee was injured when a safety guard on manufacturing equipment failed. Maintenance records showed the company was aware of the issue but delayed repairs.",
    outcome: "Settlement of $65,000 plus medical expenses",
    reasoning:
      "The company was found to have violated OSHA regulations by failing to maintain equipment in safe working condition despite knowledge of the defect.",
    similarity: 68,
    highlights: ["workplace injury", "equipment failure", "negligent maintenance"],
    date: "March 17, 2022",
  },
]

// Mock data for matched lawyers
const matchedLawyers = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Personal Injury",
    rating: 4.9,
    reviews: 127,
    experience: 12,
    image: "/placeholder.svg?height=100&width=100",
    description: "Specializes in personal injury cases with a focus on slip and fall accidents and premises liability.",
    successRate: 92,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    specialty: "Personal Injury, Medical Malpractice",
    rating: 4.8,
    reviews: 98,
    experience: 15,
    image: "/placeholder.svg?height=100&width=100",
    description:
      "Former insurance defense attorney now representing injured clients with expertise in negotiating settlements.",
    successRate: 89,
  },
  {
    id: 3,
    name: "Jennifer Lee",
    specialty: "Personal Injury, Workers' Compensation",
    rating: 4.7,
    reviews: 84,
    experience: 8,
    image: "/placeholder.svg?height=100&width=100",
    description: "Passionate advocate for injured clients with a background in healthcare and medicine.",
    successRate: 85,
  },
]

export default function PredictionPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const category = searchParams.get("category") || ""
  const [predictionLoaded, setPredictionLoaded] = useState(false)
  const [successProbability, setSuccessProbability] = useState(0)
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  useEffect(() => {
    // Simulate loading prediction
    const timer = setTimeout(() => {
      setPredictionLoaded(true)
      // Simulate a prediction between 65-85%
      setSuccessProbability(Math.floor(Math.random() * 20) + 65)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600"
    if (probability >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/start" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Case Details
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Success Probability</CardTitle>
          <CardDescription>Our prediction based on similar cases and legal precedents</CardDescription>
        </CardHeader>
        <CardContent>
          {!predictionLoaded ? (
            <div className="space-y-4 py-8">
              <p className="text-center text-gray-500">Analyzing your case...</p>
              <Progress value={60} className="h-2 w-full" />
            </div>
          ) : (
            <div className="flex flex-col items-center py-6">
              <div className="text-5xl font-bold mb-4 flex items-center gap-3">
                <span className={getProbabilityColor(successProbability)}>{successProbability}%</span>
                {successProbability >= 70 ? (
                  <ThumbsUp className="h-8 w-8 text-green-600" />
                ) : (
                  <ThumbsDown className="h-8 w-8 text-yellow-600" />
                )}
              </div>
              <p className="text-center text-gray-600 max-w-md">
                {successProbability >= 80
                  ? "Your case has a strong likelihood of a favorable outcome based on our analysis."
                  : successProbability >= 60
                    ? "Your case has a moderate chance of success with proper legal representation."
                    : "Your case presents some challenges, but an experienced attorney may help improve your chances."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-8">
        {/* Document header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-500" />
              <h2 className="text-xl font-semibold">Case Analysis Report</h2>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {currentDate}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Similar Cases Analysis for {category.replace("-", " ")} Matter</span>
          </div>

          <p className="text-gray-700 text-sm">
            The following analysis presents cases with similar fact patterns and legal issues to your current situation.
            These precedents may provide insight into potential outcomes and legal strategies.
          </p>
        </div>

        {/* Document content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium">Relevant Legal Precedents</h3>
          </div>

          <div className="space-y-8">
            {similarCases.map((caseItem, index) => (
              <div key={caseItem.id} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{caseItem.title}</h4>
                    <p className="text-sm text-gray-500 font-mono">{caseItem.citation}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
                    <span className="font-medium">{caseItem.similarity}%</span>
                    <span className="text-gray-500">similarity</span>
                  </div>
                </div>

                <div className="pl-4 border-l-2 border-gray-200 space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Facts</span>
                    <p className="text-sm text-gray-700">{caseItem.facts}</p>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</span>
                    <p className="text-sm text-gray-700">{caseItem.outcome}</p>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Reasoning</span>
                    <p className="text-sm text-gray-700">{caseItem.reasoning}</p>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Key Elements</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {caseItem.highlights.map((highlight, hIndex) => (
                        <span key={hIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Decided: {caseItem.date}</span>
                  </div>
                </div>

                {index < similarCases.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t text-sm text-gray-500">
            <p>
              <strong>Note:</strong> This analysis is based on publicly available case information and is provided for
              informational purposes only. It does not constitute legal advice. Each case has unique circumstances that
              may affect outcomes.
            </p>
          </div>

          <div className="mt-6 text-xs text-gray-400 flex justify-between">
            <span>Reference ID: CASE-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>

      {/* Matched Lawyers section */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-1">Matched Lawyers</h2>
          <p className="text-gray-600 mb-6">These attorneys specialize in cases like yours and are available to help</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedLawyers.map((lawyer) => (
              <div key={lawyer.id} className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={lawyer.image || "/placeholder.svg"} alt={lawyer.name} fill className="object-cover" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold">{lawyer.name}</h3>
                      <p className="text-gray-600">{lawyer.specialty}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 font-medium">{lawyer.rating}</span>
                        <span className="text-gray-500 ml-1">({lawyer.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Experience</span>
                      <span>{lawyer.experience} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Success Rate</span>
                      <span>{lawyer.successRate}%</span>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-700 text-sm">{lawyer.description}</p>
                </div>

                <div className="border-t grid grid-cols-2 divide-x">
                  <button className="flex items-center justify-center gap-2 py-3 hover:bg-gray-50 transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-medium">Message</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 hover:bg-gray-50 transition-colors">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">Call</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={() => router.push("/")} variant="outline" className="w-full sm:w-auto">
          Return to Home
        </Button>
      </div>
    </div>
  )
}

