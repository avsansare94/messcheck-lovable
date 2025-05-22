import { ErrorPage } from "@/components/error-page"

export default function NotFound() {
  return (
    <ErrorPage
      title="Page Not Found"
      message="We couldn't find the page you were looking for. Please check the URL or return to the home page."
    />
  )
}
