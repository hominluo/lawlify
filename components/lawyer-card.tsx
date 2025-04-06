import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MessageSquare, Phone } from "lucide-react"
import Image from "next/image"

interface Lawyer {
  id: number
  name: string
  specialty: string
  rating: number
  reviews: number
  experience: number
  image: string
  description: string
  successRate: number
}

interface LawyerCardProps {
  lawyer: Lawyer
}

export function LawyerCard({ lawyer }: LawyerCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden">
            <Image src={lawyer.image || "/placeholder.svg"} alt={lawyer.name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-medium">{lawyer.name}</h3>
            <p className="text-sm text-gray-500">{lawyer.specialty}</p>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm ml-1 font-medium">{lawyer.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({lawyer.reviews} reviews)</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Experience</span>
            <span>{lawyer.experience} years</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Success Rate</span>
            <span>{lawyer.successRate}%</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">{lawyer.description}</p>
      </div>
      <CardFooter className="flex gap-2 border-t bg-gray-50 p-3">
        <Button variant="outline" size="sm" className="flex-1">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button size="sm" className="flex-1">
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
      </CardFooter>
    </Card>
  )
}

