"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Briefcase, Home, Car, FileText, Users, Shield, AlertTriangle, Heart } from "lucide-react"

interface CaseSelectorProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const caseCategories = [
  {
    id: "personal-injury",
    name: "Personal Injury",
    description: "Accidents, injuries, medical malpractice",
    icon: AlertTriangle,
  },
  {
    id: "family-law",
    name: "Family Law",
    description: "Divorce, custody, adoption",
    icon: Users,
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Property disputes, landlord/tenant issues",
    icon: Home,
  },
  {
    id: "business-law",
    name: "Business Law",
    description: "Contracts, business formation, disputes",
    icon: Briefcase,
  },
  {
    id: "criminal-defense",
    name: "Criminal Defense",
    description: "DUI, theft, assault, felonies",
    icon: Shield,
  },
  {
    id: "estate-planning",
    name: "Estate Planning",
    description: "Wills, trusts, probate",
    icon: FileText,
  },
  {
    id: "immigration",
    name: "Immigration",
    description: "Visas, citizenship, deportation defense",
    icon: Heart,
  },
  {
    id: "auto-accidents",
    name: "Auto Accidents",
    description: "Car, truck, motorcycle accidents",
    icon: Car,
  },
]

export function CaseSelector({ selectedCategory, onSelectCategory }: CaseSelectorProps) {
  return (
    <RadioGroup value={selectedCategory} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {caseCategories.map((category) => {
        const Icon = category.icon
        return (
          <div key={category.id}>
            <RadioGroupItem
              value={category.id}
              id={category.id}
              className="peer sr-only"
              onClick={() => onSelectCategory(category.id)}
            />
            <Label
              htmlFor={category.id}
              className="flex flex-col items-start p-4 border rounded-md cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:border-gray-900 peer-data-[state=checked]:bg-gray-50"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500">{category.description}</span>
            </Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}

