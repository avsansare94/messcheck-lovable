"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"

type MessCardProps = {
  mess: {
    id: string
    mess_name: string
    mess_type: "veg" | "non_veg" | "jain" | "mixed"
    cuisine_tags: string[]
    address: string
    city: string
    pincode: string
    rating: number | null
    is_verified: boolean
  }
}

export default function MessCard({ mess }: MessCardProps) {
  const messTypeColor = {
    veg: "bg-green-100 text-green-800",
    non_veg: "bg-red-100 text-red-800",
    jain: "bg-yellow-100 text-yellow-800",
    mixed: "bg-purple-100 text-purple-800",
  }

  return (
    <Link href={`/mess/${mess.id}`}>
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="h-40 bg-gray-200 relative">
          <img
            src={`/mess-hall-meal.png?height=160&width=320&query=mess food ${mess.mess_type}`}
            alt={mess.mess_name}
            className="w-full h-full object-cover"
          />
          {mess.is_verified && <Badge className="absolute top-2 right-2 bg-blue-500">Verified</Badge>}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{mess.mess_name}</h3>
            {mess.rating && (
              <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                <span className="text-sm font-medium text-green-700">{mess.rating.toFixed(1)}</span>
                <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-1">
            <span className={`text-xs px-2 py-1 rounded ${messTypeColor[mess.mess_type]}`}>
              {mess.mess_type.charAt(0).toUpperCase() + mess.mess_type.slice(1)}
            </span>
            {mess.cuisine_tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            {mess.cuisine_tags.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                +{mess.cuisine_tags.length - 2}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-2 truncate">
            {mess.address}, {mess.city}
          </p>
        </div>
      </div>
    </Link>
  )
}
