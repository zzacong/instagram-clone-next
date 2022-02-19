export default function Spinner() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <div className="absolute inset-0 rounded-full border-4 border-gray-400" />
      <div
        role="status"
        className="absolute inset-0 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
      >
        <span className="hidden" aria-hidden="true">
          Loading...
        </span>
      </div>
    </div>
  )
}
