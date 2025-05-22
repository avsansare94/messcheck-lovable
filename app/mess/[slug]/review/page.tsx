import { ReviewForm } from "@/components/review-form"

export default function MessReviewPage({ params }: { params: { slug: string } }) {
  // Convert slug to mess name
  const messName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return <ReviewForm messName={messName} />
}
